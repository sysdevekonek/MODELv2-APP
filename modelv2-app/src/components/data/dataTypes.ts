export interface UserData{
    username: string;
    account_reference: string;
    account_holder: string;
    company: string;
    profile: string[];
    enable_client_access: boolean;
    name: string;
    address: string;
    country: string;
    city: string;
    zip: string;
    phone_no: string;
    cellphone_no: string;
    fax: string;
    email: string;
    password: string;
    confirm_password: string;
    auto_submit_capable: boolean;
    auto_submit_capable2: boolean;
    properties: UserProperty[];
}
export interface UserProperty {
  name: string;
  value: string;
  displayValue?: string;
}