import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/authService/auth.service';
import { ProductService } from '../../../core/services/productService/product.service';
import { IComment } from '../../../core/model/comments/comments.interface';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsModuleComponent implements OnInit {
  @Input() productId!: string;

  isLoggedIn = false;
  comments: IComment[] = [];
  comment: IComment = this.getEmptyComment();
  errorMessage = '';

  editingCommentId: string | null = null;
  editContent: string = '';
  editScore: string = '';

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadComments();
  }

  private getEmptyComment(): IComment {
    return {
      id: '',
      commentId: '',
      userId: '',
      userName: '',
      productId: this.productId,
      content: '',
      score: '', // score como string
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEdited: false,
      isDeleted: false,
    };
  }

  loadComments(): void {
    if (!this.productId) return;
    this.productService.getCommentsByProductId(this.productId).subscribe({
      next: (comments) => (this.comments = comments),
      error: (err) => {
        console.error('Error al cargar comentarios:', err);
        this.errorMessage = 'No se pudieron cargar los comentarios.';
      },
    });
  }

  startEdit(comment: IComment): void {
    this.editingCommentId = comment.id;
    this.editContent = comment.content;
    this.editScore = comment.score;
  }

  cancelEdit(): void {
    this.editingCommentId = null;
    this.editContent = '';
    this.editScore = '';
  }

  addComment(): void {
    this.errorMessage = '';

    if (!this.isLoggedIn) {
      this.errorMessage = 'Debes iniciar sesión para comentar.';
      return;
    }

    if (!this.comment.content || !this.comment.score) {
      this.errorMessage =
        'Por favor, completa todos los campos del comentario.';
      return;
    }

    const newComment: IComment = {
      ...this.comment,
      id: '',
      commentId: '',
      userId: this.authService.getUserIdFromToken(),
      userName: this.authService.getUserNameFromToken(),
      productId: this.productId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isEdited: false,
      isDeleted: false,
      score: String(this.comment.score), // asegura que sea string
    };

    this.productService.addComment(newComment).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.comment = this.getEmptyComment();
        this.loadComments();
      },
      error: (err) => {
        console.error('Error al enviar comentario:', err);
        this.errorMessage =
          'No se pudo enviar el comentario. Inténtalo de nuevo más tarde.';
      },
    });
  }

  saveEdit(comment: IComment): void {
    if (!this.editContent || !this.editScore) {
      this.errorMessage = 'Por favor, completa todos los campos para editar.';
      return;
    }

    const updatedComment: IComment = {
      ...comment,
      content: this.editContent,
      score: String(this.editScore),
      updatedAt: new Date().toISOString(),
      isEdited: true
    };

    this.productService.updateComment(updatedComment).subscribe({
      next: () => {
        this.loadComments();
        this.cancelEdit();
      },
      error: (err) => {
        console.error('Error al editar comentario:', err);
        this.errorMessage = 'No se pudo editar el comentario.';
      }
    });
  }

  deleteComment(commentId: string): void {
    if (!confirm('¿Seguro que quieres borrar este comentario?')) return;
    this.productService.deleteComment(commentId).subscribe({
      next: () => this.loadComments(),
      error: (err) => {
        console.error('Error al borrar comentario:', err);
        this.errorMessage = 'No se pudo borrar el comentario.';
      }
    });
  }
  getCurrentUserId(): string {
    return this.authService.getUserIdFromToken();
  }
}
