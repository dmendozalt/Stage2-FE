import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article/article.interface';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent implements OnInit {
  constructor() {}

  @Input()
  editArticle!: Article;

  @Output() setArticle = new EventEmitter();

  title: string = '';
  journal: string = '';
  abstract: string = '';

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.editArticle.editMode) {
      this.title = this.editArticle.title_display;
      this.journal = this.editArticle.journal;
      this.abstract = this.editArticle.abstract;
    } else {
      this.title = '';
      this.journal = '';
      this.abstract = '';
    }
  }

  pushArticle(): void {
    this.setArticle.emit({
      id: this.editArticle.id,
      title: this.title,
      journal: this.journal,
      abstract: this.abstract,
    });
  }
}
