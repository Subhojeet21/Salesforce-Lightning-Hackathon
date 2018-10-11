# Salesforce-Lightning-Hackathon

<a href="https://githubsfdeploy.herokuapp.com">
  <img alt="Deploy to Salesforce"
       src="https://raw.githubusercontent.com/afawcett/githubsfdeploy/master/src/main/webapp/resources/img/deploy.png">
</a>

# Case Studies 
Case Study 1:
==================

We want to implement following functionality:

1.	In Salesforce Lightning application user navigates to account home page 
2.	This should display list of account records in first half of the page and the lower half should remain blank.
3.	Following fields should be displayed in list view:

	Account Name 
	Account Number
	Account Owner
	Account Source
	Annual Revenue
	Type
	Industry
	Created By

4.	Upon selecting a record in list, the details of it should be displayed in the lower half using lightning
5.	Following fields should be visible in detail page (lower half)

	Account Name
	Account Number
	Account Owner
	Account Source
	Parent Account
	Annual Revenue
	Type
	Created By
	Last Modified By
	Industry
	Description
	Phone
	Fax

Case Study 2:
==================

We want to implement following functionality:

1.	In Salesforce Lightning application user navigates to account home page 
2.	This should display list of account records 
3.	Following fields should be displayed in list view:

	Account Name 
	Account Number
	Account Owner
	Account Source
	Annual Revenue
	Type
	Industry
	Created By

4.	User can create a new account by clicking ‘New’ button on the homepage. 
5.	User should be able to see ‘Edit’ and ‘Delete’ link in front of each record in list.
6.	When user clicks ‘Edit’ link, a pop-up window should appear with all editable fields of account.
7.	User edits the field’s value in pop-up and click save.
8.	The record should be updated, and list should refresh showing the list of records including updated record.
9.	User should be able to delete an account record by clicking ‘Delete’ link appearing in front of each record in list. A confirmation pop-up should appear for deletion.
10.	After confirming delete the record should be deleted, and list of records should be refreshed. 

Case Study 2:
==================

We want to implement following functionality:

1.	In Salesforce Lightning application user navigates to account home page 
2.	This should display:

	List of account records with checkboxes
	‘Update Account Source’ Button
	‘Delete’ button

3.	Following fields should be displayed in list:

	Account Name 
	Account Number
	Account Owner
	Account Source
	Annual Revenue
	Type
	Industry
	Created By

Mass Update

4.	User selects multiples records in list using checkboxes. 
5.	User clicks ‘Update Account Source’ button.
6.	A pop-up window appears which displays a picklist for ‘Account Source’ and list of records selected in step 4.
7.	User selects a new value from ‘Account Source’ drop down and clicks update button in pop-up.

8.	The list should refresh and show the list of records with updated value. 

Mass Delete

9.	User selects multiples records in list using checkboxes. 
10.	Clicks the Delete button. A confirmation pop-up should appear for deletion.
11.	After confirming delete the record should be deleted, and list of records should be refreshed. 


