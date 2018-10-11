public with sharing class AccountListController {
	@AuraEnabled
    public static List<Account> initializeAccountListTable(){
        List<Account> accList = [select id, name, AccountNumber, Owner.name, AccountSource, AnnualRevenue, Type, Industry, createdBy.name from Account order by createddate desc limit 10];
        system.debug('accList--'+accList);
        return accList;
    }
    
    @AuraEnabled
    public static void deleteSelectedAccount(String record){
        try{
            List<Account> accs = (List<Account>) JSON.deserialize(record, List<Account>.class);
            delete accs;
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
    
    @AuraEnabled
    public static void updateSelectedAccount(String records, String accountSourceVal){
        try{
            List<Account> accs = (List<Account>) JSON.deserialize(records, List<Account>.class);
            for(Account acc : accs){
                acc.AccountSource = accountSourceVal;
            }
            update accs;
        }catch(Exception ex){
            throw new AuraHandledException(ex.getMessage());
        }
    }
}