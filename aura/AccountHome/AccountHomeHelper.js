({
	fetchData : function (component, event, helper) {
        this.enableSpinner( 'userSpinner', component, event, helper );
		var action = component.get("c.initializeAccountListTable");
		action.setCallback(this, function(response){
            if(component.isValid() && response !== null && response.getState() === 'SUCCESS'){
                console.log(response.getReturnValue());
                let updatedData = this.getUpdatedRecords(response.getReturnValue());
                component.set("v.data", updatedData);
            }
            this.disableSpinner( 'userSpinner', component, event, helper );
        });
    
        $A.enqueueAction(action);
	},
    
    disableSpinner : function(sprinnerId, component, event, helper) {
        var spinner = component.find(sprinnerId);
        $A.util.addClass(spinner, "slds-hide");
    },

    enableSpinner : function(sprinnerId, component, event, helper) {
        var spinner = component.find(sprinnerId);
        $A.util.removeClass(spinner, "slds-hide");
    },
    
    getUpdatedRecords : function(records) {
        console.log('records');
        console.log(records);
    	for(var i=0; i< records.length ; i++){
           records[i]['OwnerName']=records[i]['Owner']['Name'];
           records[i]['CreatedByName']=records[i]['CreatedBy']['Name'];
        }
        return records;
    },
    
    showToast : function(errorMsg, successMessage, component, event, helper) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            title : errorMsg != '' ? 'Error' : 'Success',
            message: errorMsg != '' ? errorMsg : successMessage,
            duration:' 5000',
            type: errorMsg != '' ? 'error' : 'success',
            mode : 'pester'
        });
        toastEvent.fire();
    },
    
    deleteAccount : function(cmp, event, helper, accountRecs) {
        this.enableSpinner( 'userSpinner', cmp, event, helper );
		var action = cmp.get("c.deleteSelectedAccount");
        action.setParams({
            record : JSON.stringify(accountRecs)
        });
		action.setCallback(this, function(response){
            if(cmp.isValid() && response !== null && response.getState() === 'SUCCESS'){
                cmp.set('v.selectedRows',[]);
                this.fetchData(cmp, event, helper);
        		this.showToast('', 'Accounts deleted successfully', cmp, event, helper);
                this.displayToast(cmp, event, helper, '', 'Accounts deleted successfully');
            }else if(response.getState() === 'ERROR'){
                var errorMsg = response.getError()[0].message;
                this.showToast(errorMsg, '', cmp, event, helper);
                this.displayToast(cmp, event, helper, errorMsg, '');
            }
            this.disableSpinner( 'userSpinner', cmp, event, helper );
        });
    
        $A.enqueueAction(action);
    },
    
    updateAccountSource : function(cmp, event, helper, accountRecs, accountSourceVal) {
        console.log(accountRecs);
        this.enableSpinner( 'userSpinner', cmp, event, helper );
		var action = cmp.get("c.updateSelectedAccount");
        action.setParams({
            records : JSON.stringify(accountRecs),
            accountSourceVal : accountSourceVal
        });
		action.setCallback(this, function(response){
            if(cmp.isValid() && response !== null && response.getState() === 'SUCCESS'){
                cmp.set('v.selectedRows',[]);
                this.fetchData(cmp, event, helper);
        		this.showToast('', 'Account Source for the selected accounts updated successfully', cmp, event, helper);
                this.displayToast(cmp, event, helper, '', 'Account Source for the selected accounts updated successfully');
            }else if(response.getState() === 'ERROR'){
                var errorMsg = response.getError()[0].message;
                this.showToast(errorMsg, '', cmp, event, helper);
                this.displayToast(cmp, event, helper, errorMsg, '');
            }
            this.disableSpinner( 'userSpinner', cmp, event, helper );
        });
    
        $A.enqueueAction(action);
    },
    
    displayToast : function(cmp, event, helper, errorMsg, successMessage) {
        console.log('errorMsg');
        console.log(errorMsg);
        if(errorMsg){
          	cmp.set('v.toastMessage', errorMsg);
            cmp.set('v.toastTitle', 'error');
            cmp.set('v.isSuccess', false);
        }else if(successMessage){
          	cmp.set('v.toastMessage', successMessage);  
            cmp.set('v.toastTitle', 'success');
            cmp.set('v.isSuccess', true);
        }
        var elementView = document.getElementById('toastDiv');
     	elementView.style.display = 'block';
    },
})