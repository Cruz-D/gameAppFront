// comments-module.component.ts
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../../core/services/authService/auth.service';

@Component({
  selector: 'app-comments',
  imports: [FormsModule, CommonModule],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsModuleComponent implements OnInit {

  constructor(private authService: AuthService) {}
  //---------------------------------------------//
  // Propiedades del componente
  //---------------------------------------------//
  @Input() productId!: string;
  // Propiedad para verificar si el usuario está logueado COMPORBANDO LAS COOKIES
  isLoggedIn: boolean = false; // Simula el estado de autenticación
  comments: any[] = []; // Lista de comentarios
  comment = { content: '', score: 0 };
  errorMessage: string = '';

  ngOnInit(): void {
    // Simula carga de comentarios existentes
    this.loadComments();
    // Verifica si el usuario está logueado varificando la cookie o token de autenticación
    this.isLoggedIn = this.authService.isLoggedIn(); // Método simulado para verificar autenticación
  }

  loadComments(): void {
    // Simulación de datos; reemplazar con llamada a API
    this.comments = [
      { content: '¡Gran producto!', score: 8, userName: 'Usuario1', date: new Date() },
      { content: 'Buena calidad, pero algo caro.', score: 6, userName: 'Usuario2', date: new Date() }
    ];
  }

  addComment(): void {
    if (!this.comment.content.trim() || this.comment.score < 0 || this.comment.score > 10) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }

    // Simula envío de comentario; reemplazar con llamada a API
    const newComment = {
      content: this.comment.content,
      score: this.comment.score,
      userName: 'UsuarioActual', // Reemplazar con el nombre del usuario logueado
      date: new Date()
    };
    this.comments.unshift(newComment);
    this.comment = { content: '', score: 0 }; // Resetea el formulario
    this.errorMessage = '';
  }
}
