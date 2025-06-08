import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.page.html',
  styleUrls: ['./catalogo.page.scss'],
  standalone: false,
})
export class CatalogoPage {
  productos = [
    {
      titulo: 'Tapa antipolvo',
      descripcion: 'Tapa antipolvo para celular con diseño de gatito.',
      precio: 850,
      imagen: 'assets/img/tapa.jpg',
      meGusta: false,
    },
    {
      titulo: 'Michi—Lámpara',
      descripcion: 'Lámpara de mesa noctura de madera.',
      precio: 19990,
      imagen: 'assets/img/lampara.jpg',
      meGusta: false,
    },
    {
      titulo: 'Pegatinas',
      descripcion: '100 pegatinas diferentes de Glowy el gatito negro',
      precio: 2990,
      imagen: 'assets/img/pegatinas.jpg',
      meGusta: false,
    }
  ];

  constructor(private router: Router) {}

  irHome() {
    this.router.navigate(['/home']);
  }

  toggleLike(producto: any) {
    producto.meGusta = !producto.meGusta;
  }

  comprar(producto: any) {
    console.log('Comprar:', producto);
  }

  agregarCarrito(producto: any) {
    console.log('Agregar al carrito:', producto);
  }
}
