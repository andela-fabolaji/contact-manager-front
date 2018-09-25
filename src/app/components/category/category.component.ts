import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: any[];
  form: any;
  sending: boolean = false;
  isNewForm: boolean = true;
  editingCatId: string = null;
  context: string = 'categories';
  
  constructor(private apiService: ApiService) {
    this.categories = [];
    this.form = {
      name: '',
      title: 'Add New Category',
    };
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.apiService.index(this.context)
      .subscribe(
        res => {
          if (res.data) {
            this.categories = res.data;
          }
        }
      );
  }

  showAddForm() {
    this.form = {
      name: '',
      title: 'Add New Category'
    }
    this.isNewForm = true;
  }

  edit(id: string, name: string) {
    this.form = {
      name,
      title: 'Update Category'
    };
    this.editingCatId = id;
  }

  delete(id: string): void {
    this.apiService.delete(this.context, id)
      .subscribe(
        res => {
          if (res.data) {
            this.categories = this.categories.filter(category => category._id != res.data._id);
          }
        }
      );
  }

  update(id: string) {
    if (!this.form.name) return;
    this.sending = true;
    this.apiService.update(this.context, id, { name: this.form.name })
      .subscribe(
        res => {
          this.sending = false;
          if (res.data) {
            const idx = this.categories.findIndex(cat => cat._id == id);
            this.categories = [
              ...this.categories.splice(0, idx),
              ...res.data,
              ...this.categories.splice(idx + 1)
            ];
          }
          this.resetForm();
        }
      );
  }

  save() {
    if (!this.form.name) return;
    this.sending = true;
    this.apiService.save(this.context, { name: this.form.name })
      .subscribe(
        res => {
          this.sending = false;
          if (res.data) {
            this.categories = [
              ...this.categories,
              ...res.data
            ]
          }
          this.resetForm();
        }
      );
  }

  resetForm() {
    this.form = {
      name: '',
      title: 'Add New Category',
    };
    this.editingCatId = null;
  }
}