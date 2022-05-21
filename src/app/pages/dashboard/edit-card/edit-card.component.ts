import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Article } from 'src/app/interfaces/article/article.interface';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss'],
})
export class EditCardComponent implements OnInit {
  constructor() {}

  @Output() setArticle = new EventEmitter();

  title: string = '';
  journal: string = '';
  abstract: string = '';

  ngOnInit(): void {}

  pushArticle(): void {
    this.setArticle.emit({
      id: '',
      title: this.title,
      journal: this.journal,
      abstract: this.abstract,
    });
  }
}
