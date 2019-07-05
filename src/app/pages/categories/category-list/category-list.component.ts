import { Component, OnInit } from '@angular/core';
import { Category, CategoryService } from '../shared/';
import { Alert } from 'selenium-webdriver';
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService
      .getAll()
      .subscribe(
        categories => (this.categories = categories),
        error => alert('Error ao carregar a lista')
      );
  }

  deleteCategory(category) {
    const mustDelete = confirm('Deseja realmente excluir esse item?');

    if (mustDelete) {
      this.categoryService
        .delete(category.id)
        .subscribe(
          () =>
            (this.categories = this.categories.filter(el => el !== category)),
          () => alert('Erro ao tentar excluir')
        );
    }
  }
}
