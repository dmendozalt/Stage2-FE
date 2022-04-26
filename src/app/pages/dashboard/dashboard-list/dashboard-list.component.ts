import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article/article.interface';
import { ArticleService } from 'src/app/services/article.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
})
export class DashboardListComponent implements OnInit {
  articles: Article[] = [];

  editArticle: Article = {
    id: '',
    journal: '',
    abstract: '',
    title_display: '',
    editMode: false,
    editCount: 0,
  };

  constructor(private ArticleService: ArticleService) {}

  ngOnInit(): void {
    this.ArticleService.getArticles().subscribe((response: any) => {
      this.articles = response.response.docs.map((art: any) => {
        art.editMode = false;
        art.editCount = 0;
        art.abstract = art.abstract.join('\n');
        return art;
      });
    });
  }

  editCard(articleId: string): void {
    const articleIndex = this.articles.findIndex((art) => art.id === articleId);
    this.editArticle = this.articles[articleIndex];
  }

  removeCard(articleId: string): void {
    const articleIndex = this.articles.findIndex((art) => art.id === articleId);
    this.articles.splice(articleIndex, 1);
    Swal.fire('Article removed', '', 'success');
  }

  clearEdit(): void {
    this.editArticle = {
      id: '',
      journal: '',
      abstract: '',
      title_display: '',
      editMode: false,
      editCount: 0,
    };
  }

  setArticle(newArticle: {
    id: string;
    title: string;
    journal: string;
    abstract: string;
  }): void {
    this.clearEdit();
    if (newArticle.id !== '') {
      const article = this.articles.find((art) => art.id === newArticle.id);
      if (article) {
        article.title_display = newArticle.title;
        article.abstract = newArticle.abstract;
        article.journal = newArticle.journal;
        article.editMode = false;
        article.editCount++;
        console.log(article);
      }
    } else {
      this.articles.push({
        id: new Date().toLocaleTimeString(),
        editMode: false,
        editCount: 0,
        abstract: newArticle.abstract,
        journal: newArticle.journal,
        title_display: newArticle.title,
      });
    }
    console.log(this.articles);
  }
}
