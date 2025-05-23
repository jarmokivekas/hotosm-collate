

const HOTOSM_COLORMAP = ["#d73f3f","#d73f3f","#d73f3f","#d73f3f","#d73f3f","#da493b","#da493b","#da493b","#da493b","#da493b","#de5438","#de5438","#de5438","#de5438","#de5438","#e25f34","#e25f34","#e25f34","#e25f34","#e25f34","#e56a31","#e56a31","#e56a31","#e56a31","#e56a31","#e9752d","#e9752d","#e9752d","#e9752d","#e9752d","#ed802a","#ed802a","#ed802a","#ed802a","#ed802a","#f08b26","#f08b26","#f08b26","#f08b26","#f08b26","#f49623","#f49623","#f49623","#f49623","#f49623","#f8a11f","#f8a11f","#f8a11f","#f8a11f","#f8a11f","#f1a721","#f1a721","#f1a721","#f1a721","#f1a721","#dfa828","#dfa828","#dfa828","#dfa828","#dfa828","#cea82f","#cea82f","#cea82f","#cea82f","#cea82f","#bca937","#bca937","#bca937","#bca937","#bca937","#aaaa3e","#aaaa3e","#aaaa3e","#aaaa3e","#aaaa3e","#99ab45","#99ab45","#99ab45","#99ab45","#99ab45","#87ab4c","#87ab4c","#87ab4c","#87ab4c","#87ab4c","#76ac53","#76ac53","#76ac53","#76ac53","#76ac53","#64ad5a","#64ad5a","#64ad5a","#64ad5a","#64ad5a","#53ae62","#53ae62","#53ae62","#53ae62","#53ae62","#53ae62",]
const HOTOSM_COLORS = {
    red: "#D73F3F",
    red_dark: "#6C2020",
    red_light: "#FFEDED",
    orange: "#FAA71E",
    tan: "#F0EFEF",
    blue_dark: "#2C3038",
    blue_grey: "#68707F",
    blue_light: "#929DB3",
    grey_light: "#E1E0E0",
    green: "#53AE62"
  }

const HOTOSM_TM_INSTANCE_URL  = "https://tasks.hotosm.org"

// generic function to access any api endpoint on the tasking manager. 
async function get_api_data_v2(
    api_endpoint, 
    parameters = {},
    instance = "https://tasking-manager-production-api.hotosm.org", 
    v2_apiroot = "/api/v2",
){

    var url = new URL(instance + v2_apiroot + "/" + api_endpoint + "/");

    url.search = new URLSearchParams(parameters); 
    console.log("fetching from API: " + url.toString()); //

    const response = await fetch(url.toString(), {
      method: "GET",
      mode: "cors", 
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
    });
    return response.json(); // parses JSON response into native JavaScript objects
}




// prettyfy the date time data from the tasking manager api to something slightly more presentable
// in the data table
function formatDatetime(date) {
    
    return date.getUTCFullYear() + "-" +
        ("0" + (date.getUTCMonth()+1)).slice(-2) + "-" +
        ("0" + date.getUTCDate()).slice(-2) + " " +
        ("0" + date.getUTCHours()).slice(-2) + ":" +   // Get month and pad it with zeroes
        ("0" + date.getUTCMinutes()).slice(-2) + " UTC"
        
}

// creates the main results table if and populates it with fetched from the TM search API
function tableCreate(search_results, page) {

    // list of the field names that will be included in the data table
    columns = ["projectId", "name", "percentMapped", "percentValidated", "priority", "difficulty", "status", "organisationName", "lastUpdated", "dueDate"];



    table_body = document.getElementById("dataframe-body");
    for (result of search_results) {
        const tr = table_body.insertRow();
        for (column of columns) {
            const td = tr.insertCell();
            field_value = result[column]

            // apply modifications and color maps to datafields
            switch (column) {
                case "percentMapped":
                case "percentValidated":
                    td.style["background-color"] = HOTOSM_COLORMAP[field_value]                    
                    td.appendChild(document.createTextNode(field_value));
                    break;
                case "projectId":
                    link = document.createElement("a");
                    link.href  = HOTOSM_TM_INSTANCE_URL + "/projects/" + field_value;
                    a = td.appendChild(link)
                    a.appendChild(document.createTextNode("#" + field_value));
                    break;
                case "lastUpdated":
                case "dueDate":
  
                    if (field_value == null) {
                        break
                    }
                    date = new Date(field_value);
                    date = formatDatetime(date);
                    td.appendChild(document.createTextNode(date));
                    break;
                default:
                    td.appendChild(document.createTextNode(field_value));
                    break;
            }
            
        }

    }
    
}

// copy the GET parameters from the URL and populate the search & filtering form inputs
// this makes it easier to edit your search queries, as otherwise the form is emptied every time
// the page is refreshed.
function update_search_parameters(){

    const urlParams = new URLSearchParams(window.location.search); 

    form_inputs = [
        "textSearch", "country", "campaign", "interest", "organisationName", "orderBy", "orderByType", "projectStatuses"
    ]

    for (form_input of form_inputs) {
        document.getElementById(form_input).value = urlParams.get(form_input);
    }

    return urlParams
}





function get_search_results(page) {



    api_call_params = {
        textSearch: urlParams.get("textSearch"),
        campaign: urlParams.get("campaign"),
        country: urlParams.get("country"),
        interest: urlParams.get("interest"),
        organisationName: urlParams.get("organisationName"),
        projectStatuses: urlParams.get("projectStatuses") ? urlParams.get("projectStatuses") : "ARCHIVED,PUBLISHED,DRAFT",
        orderBy: urlParams.get("orderBy") ? urlParams.get("orderBy") : "id",
        orderByType: urlParams.get("orderByType") ? urlParams.get("orderByType") : "ASC",
        page: page,
    }


    // 
    get_api_data_v2("projects", api_call_params).then( (single_page_data) => {
            
        console.log(single_page_data.results);
        search_results = single_page_data.results;
        console.log("appended to search results");
        console.log(search_results);
        tableCreate(search_results, page);        

        // recursive call to this function if there are still more pages
        if (single_page_data.pagination.hasNext == true) {
            console.log("found one more page")
            page = page + 1;
            get_search_results(page)
        }

            
    });


}


function preset_null_filters() {
    // set default values to any filter that need to have one.
    const urlParams = new URLSearchParams(window.location.search); 
    const select_ids = ["projectStatuses","orderBy","orderByType"]

    for (select_id of select_ids) {
        console.log(select_id)

        var select = document.getElementById(select_id)
        var value = urlParams.get(select_id)
        if (!value) {
            var default_value = select.firstElementChild.value
            document.getElementById(select_id).value = default_value

        }


    }

}


// get the list on names for campaigns, organisations, interest and countries
// and popluate them to the filter form input datalists to enable users
// to autocomplete valid input values for those form inputs
function populate_datalist(datalist_id, api_endpoint) {


    get_api_data_v2(api_endpoint).then( (response) => {
            
        console.log(response)
        let option_values = []
        switch (api_endpoint) {
            case "campaigns":
                option_values = response.campaigns.map(a => a.name);
                break;
            case "organisations":
                option_values = response.organisations.map(a => a.name);
                break;
            case "interests":
                option_values = response.interests.map(a => a.name);
                break;
            case "countries":
                option_values = response.tags
                break;
            default:
                return;
        }

        datalist = document.getElementById(datalist_id) 

        for (option_value of option_values) {
            let option = document.createElement('option')
            option.value = option_value
            datalist.appendChild(option)
        }

    });

}




function main() {
    populate_datalist("campaignList", "campaigns")
    populate_datalist("countryList", "countries")
    populate_datalist("organisationNameList", "organisations")
    populate_datalist("interestList", "interests")

    urlParams = update_search_parameters();
    preset_null_filters()
    get_search_results(page=1)  
}

main()

// let table = new DataTable('#dataframe-table');