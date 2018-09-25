import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  context: string = 'contacts';
  contacts: any[];
  categories: any[];
  form: any;
  editingContactId: string = null;
  sending: boolean = false;
  
  constructor(private apiService: ApiService) {
    this.contacts = [];
    this.form = {
      title: 'Create New Contact',
      name: '',
      email: '',
      phone: '',
      category: {}
    }
  }

  ngOnInit() {
    this.getContacts();
    this.getCategories();
  }

  getContacts() {
    this.apiService.index(this.context)
      .subscribe(
        res => {
          if (res.data) {
            this.contacts = res.data;
          }
        }
      );
  }

  getCategories() {
    this.apiService.index('categories')
      .subscribe(
        res => {
          if (res.data) {
            this.categories = res.data;
            this.form.category = res.data[0];
          }
        }
      );
  }

  showAddForm() {
    this.form = {
      name: '',
      title: 'Add New Category'
    }
    this.editingContactId = null;
  }

  edit(contact: any) {
    const { _id, name, email, phone, category } = contact;
    this.form = Object.assign({}, this.form, {
      title: 'Update Contact',
      name,
      email,
      phone,
      category
    });
    this.editingContactId = _id;
  }

  delete(id: string): void {
    this.apiService.delete(this.context, id)
      .subscribe(
        res => {
          if (res.data) {
            this.contacts = this.contacts.filter(category => category._id != res.data._id);
          }
        }
      );
  }

  update(id: string) {
    const { name, phone, email, category } = this.form;
    if (!name || !email || !phone || !category) return;
    const formData = { name, email, phone, category };

    this.sending = true;
    this.apiService.update(this.context, id, formData)
      .subscribe(
        res => {
          this.sending = false;
          if (res.data) {
            const idx = this.contacts.findIndex(cat => cat._id == id);
            this.contacts = [
              ...this.contacts.splice(0, idx),
              ...res.data,
              ...this.contacts.splice(idx + 1)
            ];
          }
          this.resetForm();
        }
      );
  }

  save() {
    const { name, phone, email, category } = this.form;
    if (!name || !email || !phone || !category) return;
    const formData = { name, email, phone, category };

    this.sending = true;
    this.apiService.save(this.context, formData)
      .subscribe(
        res => {
          this.sending = false;
          if (res.data) {
            this.contacts = [
              ...this.contacts,
              ...res.data
            ]
          }
          this.resetForm();
        }
      );
  }

  onChange(value: string) {
    this.form.category = value;
  }

  resetForm() {
    this.form = {
      title: 'Create New Contact',
      name: '',
      email: '',
      phone: '',
      category: this.categories[0]
    }
    this.editingContactId = null
  }
}