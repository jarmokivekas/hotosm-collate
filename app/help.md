---
title: Help | HOTOSM Collate
author: Jarmo Kivekäs
layout: documentation
---





# Search Criteria



Filter fields may be left empty, in which case they are simply ignored. Please use at least one field: if all the fields are empty, the search will return every project in the tasking manager. 

- **Text search** is a free-form keyword search for projects. Useful for example in large activations where there might be projects by multiple groups that are not all tagged as part of the same campaign, for example. This field searches in the tasking manager project title and description.

The following four field require specific inputs in that match tags used in the Tasking Manager. Start typing in the text box to get a drop-down list of possible inputs that match what you typed.

- **Campaign** has to be a specific campaign tag in the tasking manager. For example "Cyclone Lekima" or "The India Flood 2023".

- **Country** in which the project area is situated in, for example "Peru", "Canada", or "Papua New Guinea"

- **Organisation name** Name of the organisation running or requesting the project, e.g "British Red Cross" or "Missing Maps".

- **Interests** one of the mapper interests, e.g. "disaster response", "public health", or "water & sanitation"


## How are multiple fiters applied?

You need to use at least one of the five filters described in the section above for you search criteria. You may also use all or only some of them. When using multiple filters they are combine with a logical AND operation, so all of the applied filters must match for a project to show up in the search result.

For example if you apply the filters:

- country: Mozambique
- organisation name: Missing Maps

The search will return all the Tasking Manager projects run by Missing Maps in Mozambique, but no projects in other countries, and no projects in Mozambique that are run by another organisation.

## Saving filters for future use

The search filters are saved to the URL of the page when clicking the "Apply Filters" button. You can save or share a search result by copying the page's URL from you browser address bar. Accessing the link later will run the search again with the same filters applied.




# Sorting and ordering the results

By default the search results are listed sorted by project ID.

- **project ID (chronological)** Ordering by project ID is very useful for creating tables for Wikis or spreadsheets that are consistent over the time of the activation. Project ID's are a sequential increasing number like "#5819", "#7815". Sorting by project ID will sort the project in order of creation. Over the span of weeks or months during an activation, this order will stay the same even as projects are created and completed. Sorting by project ID is a good default order to use in activation documentation as it will prevent projects moving up and down in the table over time. 

- **difficulty** The search results are grouped based on the difficulty level of the mapping as determined by the projects' creator. The difficulties are "EASY", "MODERATE", and "DIFFICULT"

TODO: complete this section

- **priority** 

- **status**

- **last updated**

- **due date**


## Planned features


### Pending Archival filter 

Projects matching the "Pending archival" filter are:

- Over 99% mapped
- Over 99% validated
- Have the `PUBLISHED` status

These projects need attention from activation management to be brought all the way to completion, and eventually set to the `ARCHIVED` status. 

### Pending Validation filter

Project mathing the "Pending Validation" filter are:

- over 99% mapped
- less than 99% validated
- have the `PUBLISHED` status

These projects can be brought to the attention of validation teams by the activation management 

### Autocompletion

Autocompletion of dropdown list of accepted values if filter fields



