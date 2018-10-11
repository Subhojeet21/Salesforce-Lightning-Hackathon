({
	init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Account Name', fieldName: 'Name', type: 'text'},
            {label: 'Account Number', fieldName: 'AccountNumber', type: 'text'},
            {label: 'Account Owner', fieldName: 'OwnerName', type: 'text'},
            {label: 'Account Source', fieldName: 'AccountSource', type: 'text'},
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue', type: 'currency'},
            {label: 'Type', fieldName: 'Type', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {label: 'Created By', fieldName: 'CreatedByName', type: 'text'}
        ]);
        helper.fetchData(cmp, event, helper);
    },
    
    handleRowSelection : function(cmp, event, helper) {
        cmp.set("v.renderDetail", true);
        let source = event.getSource();
        console.log(source.get('v.value'));
        console.log(source.get('v.name'));
        let checkValue = source.get('v.value');
        let rowIndex = source.get('v.name');
        /*let selectedRow = Object.values(event.getParam('selectedRows'))[0];
        let selectedRecId = selectedRow.Id;
        console.log(selectedRecId);
        cmp.set("v.selectedRow", selectedRow);
        cmp.set("v.selectedRecordId",selectedRecId);*/
        let selectedRecs = cmp.get('v.selectedRows');
        let dataRecs = cmp.get('v.data');
        if(checkValue){
            cmp.set("v.selectedRecordId",dataRecs[rowIndex].Id);
            selectedRecs.push(dataRecs[rowIndex]);
        }else{
            selectedRecs.splice( selectedRecs.indexOf(dataRecs[rowIndex]), 1 );
            let checkBoxes = cmp.find("checkId");
            let isCheck = false;
            for(let i=0; i<checkBoxes.length; i++){
                let checkVal = checkBoxes[i].get('v.value');
                if(checkVal){
                    isCheck = true;
                    cmp.set("v.selectedRecordId",dataRecs[i].Id);
                }
            }
            if(!isCheck){
                cmp.set("v.renderDetail", false);
            }
        }
        cmp.set('v.selectedRows', Object.values(selectedRecs));
    },
    
    handleSelectAll : function(cmp, event, helper) {
        let source = event.getSource();
        console.log(source.getLocalId());
        console.log(source.get('v.value'));
        let selectedRecs = cmp.get('v.selectedRows');
        let dataRecs = cmp.get('v.data');
        let selectAllVal = source.get('v.value');
        if(selectAllVal){
            let checkBoxes = cmp.find("checkId");
            for(let i=0; i<checkBoxes.length; i++){
                checkBoxes[i].set('v.value', true);
                selectedRecs.push(dataRecs[i]);
            }
            cmp.set('v.selectedRows', Object.values(selectedRecs));
        }else{
            let checkBoxes = cmp.find("checkId");
            for(let i=0; i<checkBoxes.length; i++){
                checkBoxes[i].set('v.value', false);
            }
            cmp.set('v.selectedRows', []);
            cmp.set("v.selectedRecordId","");
        }
    },
    
    addNewAccount : function(cmp, event, helper) {
        console.log('add new account');
        cmp.set('v.newAccountDilogBoxOpen', true);
    },
    
    editAccount : function(cmp, event, helper) {
        //cmp.set('v.editDilogBoxOpen', true);
        var elementView = document.getElementById('editDiv');
     	elementView.style.display = 'block';
        let source = event.getSource();
        let rowIndex = source.get('v.class');
        let dataRecs = cmp.get('v.data');
        cmp.set('v.editRecordId', dataRecs[rowIndex].Id);
    },
    
    deleteAccount : function(cmp, event, helper) {
        let source = event.getSource();
        let rowIndex = source.get('v.class');
        let dataRecs = cmp.get('v.data');
        let selectedAcc = dataRecs[rowIndex].Name;
        console.log(selectedAcc);
        if (confirm("Are you sure about deleting the account "+selectedAcc)) {
            console.log('yes');
            cmp.set('v.deleteRecordId', dataRecs[rowIndex].Id);
            let recSelected = dataRecs[rowIndex];
            let selectedRecs = cmp.get('v.selectedRows');
            selectedRecs.push(recSelected);
            helper.deleteAccount(cmp, event, helper, selectedRecs);
        }
    },
    
    handleAddSuccess : function(cmp, event, helper) {
        console.log('on success');
        cmp.set('v.newAccountDilogBoxOpen', false);
        helper.fetchData(cmp, event, helper);
        helper.showToast('', 'New Account created successfully', cmp, event, helper);
        helper.displayToast(cmp, event, helper, '', 'New Account created successfully');
    },
    
    handleEditSuccess : function(cmp, event, helper) {
        console.log('on success');
        //cmp.set('v.editDilogBoxOpen', false);
        var elementView = document.getElementById('editDiv');
     	elementView.style.display = 'none';
        helper.fetchData(cmp, event, helper);
        helper.showToast('', 'Account updated successfully', cmp, event, helper);
        helper.displayToast(cmp, event, helper, '', 'Account updated successfully');
    },
    
    handleError : function(cmp, event, helper) {
        var eventName = event.getName();
        var eventDetails = event.getParam("error");
        console.log('Error Event received' + eventName);
        helper.showToast(eventDetails, '', cmp, event, helper);
        helper.displayToast(cmp, event, helper, eventDetails, '');
	},
    
    closeModel : function(cmp, event, helper) {
        console.log('inside close modal');
        cmp.set('v.newAccountDilogBoxOpen', false);
        cmp.set('v.editDilogBoxOpen', false);
        var elementView = document.getElementById('editDiv');
     	elementView.style.display = 'none';
        var multipleEditView = document.getElementById('multipleEditDiv');
     	multipleEditView.style.display = 'none';
    },
    
    closeToast : function(cmp, event, helper) {
        var elementView = document.getElementById('toastDiv');
     	elementView.style.display = 'none';
    }, 
    
    handleMultipleEdit : function(cmp, event, helper) {
        var elementView = document.getElementById('multipleEditDiv');
     	elementView.style.display = 'block';
        let selectedRecs = cmp.get('v.selectedRows');
        console.log('selectedRecs');
        console.log(selectedRecs);
        let selectAllCheckbox = cmp.find("selectAllcheckbox");
        selectAllCheckbox.set('v.value', false);
    },
    
    updateAccounts : function(cmp, event, helper) {
        let selectedRecs = cmp.get('v.selectedRows');
        console.log('selectedRecs');
        console.log(selectedRecs);
        let element = cmp.find('newAccountSource');
        let elemVal = element.get('v.value');
        console.log('elemVal');
        console.log(elemVal);
        helper.updateAccountSource(cmp, event, helper, selectedRecs, elemVal);
        var elementView = document.getElementById('multipleEditDiv');
     	elementView.style.display = 'none';
    },
    
    deleteAccounts : function(cmp, event, helper) {
        let selectedRecs = cmp.get('v.selectedRows');
        console.log('selectedRecs');
        console.log(selectedRecs);
        helper.deleteAccount(cmp, event, helper, selectedRecs);
        let selectAllCheckbox = cmp.find("selectAllcheckbox");
        selectAllCheckbox.set('v.value', false);
    }
     
})