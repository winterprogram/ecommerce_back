class User {
  constructor(obj) {
    this.userId = obj.user_id;
    this.name = obj.name;
    this.mobile = obj.mobile_number;
    this.email = obj.email_id;
    this.dob = obj.dob;
    this.password = obj.password;
    this.address = obj.addresses;
    this.isActive = obj.is_active;
    this.createdAt = obj.created_at;
    this.updatedAt = obj.updated_at;
  }
}
