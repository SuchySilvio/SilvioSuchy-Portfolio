import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Renderer2, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

declare var TagCloud: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  //css in angular.json global styles
  imports: [CommonModule],
  standalone: true,
})
export class AppComponent implements OnInit, AfterViewInit {
  isLoading: boolean = true;
  isDarkMode: boolean = false; // Initial state of dark mode


  // Added ViewChild for typeinElement
  @ViewChild('typeinElement') typeinElement!: ElementRef;
  @ViewChild('skillSphere') skillSphere!: ElementRef;
  @ViewChild('skillSphereMobile') skillSphereMobile!: ElementRef;

  

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  
  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      // Ensure change detection runs to update the view before initializing.
      this.cdr.detectChanges();
      this.initializeTyped();
      this.initializeTagCloud();
      this.isDarkMode = localStorage.getItem('darkMode') === 'true';
      this.applyTheme();
    }, 3000); // Adjust time as needed based on your loading logic
  }
  

  ngAfterViewInit(): void {
    this.initializeTyped();
    this.loadTagCloudScript();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('darkMode', this.isDarkMode.toString()); // Save preference
    this.applyTheme();
  }

  applyTheme(): void {
    const themeClass = this.isDarkMode ? 'dark-mode' : 'light-mode';
    this.renderer.setAttribute(document.body, 'class', themeClass);
  }

  initializeSwiper(): void {
    new Swiper('.mySwiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      loop: true,
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
      },
      pagination: {
        el: '.swiper-pagination',
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  loadTagCloudScript(): void {
    const script = this.renderer.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/TagCloud@2.2.0/dist/TagCloud.min.js';
    script.onload = () => {
      this.initializeTagCloud();
      this.cdr.detectChanges(); // Manually trigger change detection
    };
    this.renderer.appendChild(document.body, script);
  }

  initializeTyped(): void {
    if (this.typeinElement) {
      import('typed.js').then(Typed => {
        const options = {
          strings: ["Hola, Mi nombre es", "Hello, my name is", "Bonjour, je m'appelle", "नमस्कार, मेरा नाम "],
          typeSpeed: 80,
          backSpeed: 80,
          loop: true,
        };

        new Typed.default(this.typeinElement.nativeElement, options);
      });
    }
  }

  initializeTagCloud(): void {
    if (this.skillSphere && this.skillSphereMobile) {
      const Skillset = ['HTML', 'CSS', 'JavaScript', 'Angular', 'React', 'Node.js', 'Express', 'MongoDB'];
      TagCloud(this.skillSphere.nativeElement, Skillset, { radius: 300 });
      TagCloud(this.skillSphereMobile.nativeElement, Skillset, { radius: 200 });
    }
  }
}
