import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-historias-de-exito',
  templateUrl: './historias-de-exito.component.html',
  styleUrls: ['./historias-de-exito.component.css']
})
export class HistoriasDeExitoComponent implements OnInit, AfterViewInit  {

  public historiasExito: any = {
    historiasExito: [
      {
        usuario: "Ana",
        sentimiento: "Encantada",
        historia: "Gracias a Toluca la Bella, mi búsqueda de un restaurante para celebrar mi aniversario fue todo un éxito.La variedad de opciones y las reseñas detalladas hicieron que nuestra elección fuera sencilla y satisfactoria. Encontrar un lugar perfecto para una ocasión especial nunca fue tan fácil. Definitivamente, recomendaría Toluca la Bella a cualquiera que busque experiencias memorables en Toluca."
      },
      {
        usuario: "María",
        sentimiento: "Encantada",
        historia: "Como residente de Toluca, siempre recurro a Toluca la Bella cuando necesito encontrar servicios locales de calidad. La interfaz fácil de usar y las actualizaciones constantes hacen que sea mi primera opción para descubrir nuevos lugares y servicios en la ciudad. Gracias a Toluca la Bella, he descubierto joyas ocultas en Toluca que de otra manera no habría encontrado. ¡No puedo imaginar vivir en Toluca sin este directorio!"
      },
      {
        usuario: "Laura",
        sentimiento: "Feliz",
        historia: "Toluca la Bella ha sido mi compañero confiable cuando necesito encontrar servicios locales en Toluca. La información detallada y las reseñas auténticas de otros usuarios me han ayudado a tomar decisiones informadas. La plataforma es fácil de navegar y siempre me proporciona resultados precisos y relevantes. ¡Definitivamente lo recomiendo a cualquiera que busque lo mejor de Toluca!"
      },
      {
        usuario: "Juan",
        sentimiento: "Satisfecho",
        historia: "Nuestra experiencia con Toluca la Bella ha sido excepcional. Desde que nos inscribimos, hemos visto un aumento significativo en el tráfico a nuestro negocio. Gracias a la visibilidad que nos brinda esta plataforma, hemos logrado conectarnos de manera efectiva con clientes locales interesados en nuestros servicios. Estar listados en Toluca la Bella ha sido una inversión valiosa para el crecimiento de nuestro negocio."
      },
      {
        usuario: "José",
        sentimiento: "Agradecido",
        historia: "Desde que nos unimos a Toluca la Bella, hemos experimentado un aumento notable en la visibilidad de nuestro negocio. La plataforma nos ha ayudado a llegar a un público más amplio y atraer a clientes potenciales que de otra manera no nos habrían encontrado. Estamos muy agradecidos por la oportunidad que Toluca la Bella nos ha brindado para destacar entre la competencia local."
      },
      {
        usuario: "Carlos",
        sentimiento: "Agradecido",
        historia: "Estamos encantados con los resultados que hemos visto desde que nos registramos en Toluca la Bella. La plataforma nos ha brindado una exposición significativa a una audiencia local interesada en nuestros servicios. La facil accesibilidad y la interfaz intuitiva hacen que sea una herramienta invaluable para cualquier negocio local en Toluca que busque aumentar su presencia en línea ¡Gracias, Toluca la Bella!"
      }

    ]

  };

  constructor(
    private renderer: Renderer2
    , private elem: ElementRef
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const items = this.elem.nativeElement.querySelectorAll(".carousel-item");
    this.renderer.addClass(items[0], "active");
  }

  

}
