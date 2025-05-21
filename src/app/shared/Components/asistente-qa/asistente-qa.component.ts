import { Component, OnInit, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-asistente-qa',
  standalone: false,
  templateUrl: './asistente-qa.component.html',
  styleUrl: './asistente-qa.component.css'
})
export class AsistenteQAComponent implements OnInit {
  isOpen = false;
  userInput = '';
  messages: { text: string; sender: 'user' | 'assistant'; loading?: boolean }[] = [];
  showSuggestedQuestions = true;

  suggestedQuestions = [
    "¿Qué es Quantum Gateway?",
    "¿Qué características ofrece?",
    "¿Cuáles son los precios?",
    "¿Con qué sistemas se integra?",
    "¿Cómo garantizan la seguridad?",
    "¿Ofrecen período de prueba?",
    "¿Cómo puedo contactarlos?"
  ];

  private knowledgeBase: Record<string, string> = {
    "quantum gateway": "Quantum Gateway es un sistema de gestión hotelera premium que incluye control de habitaciones, gestión de reservas, facturación y análisis predictivo con IA.",
    "características": "Nuestro sistema ofrece: panel administrativo completo, gestión de huéspedes, programación inteligente, sistema de pagos integrado y reportes financieros en tiempo real.",
    "precios": "Ofrecemos un Plan Básico gratuito y un Plan Premium a $3,500,000 COP/mes con IA predictiva y soporte 24/7.",
    "integraciones": "Se integra con canales de distribución como Booking y Expedia, sistemas de pago y herramientas de marketing.",
    "seguridad": "Usamos encriptación AES-256, autenticación multifactor y cumplimiento GDPR/LOPD para proteger tus datos.",
    "prueba": "Ofrecemos 14 días gratis para probar todas las funciones sin compromiso.",
    "contacto": "Puedes contactarnos al +57 (302) 8667326 o por email a contactoquantumgateway.com. Soporte disponible 24/7."
  };

  private greetings = [
    "¡Hola! Soy el asistente de Quantum Gateway. ¿En qué puedo ayudarte hoy?",
    "Hola, ¿qué información necesitas sobre nuestro sistema de gestión hotelera?",
    "Bienvenido al asistente virtual de Quantum Gateway. ¿Cómo puedo asistirte?"
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.addAssistantMessage(this.getRandomGreeting());
  }

  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen && this.messages.length === 0) {
      this.addAssistantMessage(this.getRandomGreeting());
    }
    this.showSuggestedQuestions = true;
  }

  sendMessage(): void {
    const input = this.userInput.trim();
    if (!input) return;

    this.addUserMessage(input);
    this.userInput = '';
    this.showSuggestedQuestions = false;

    this.addLoadingMessage();

    setTimeout(() => {
      this.removeLoadingMessage();
      this.processUserMessage(input.toLowerCase());
    }, 800);
  }

  sendSuggestedQuestion(question: string): void {
    this.userInput = question;
    this.sendMessage();
  }

  private processUserMessage(message: string): void {
    const matchedKey = Object.keys(this.knowledgeBase).find(key =>
      message.includes(key.toLowerCase())
    );

    let response: string;

    if (this.isGreeting(message)) {
      response = this.getRandomGreeting();
    } else if (matchedKey) {
      response = this.knowledgeBase[matchedKey];
    } else {
      response = "Puedo ayudarte con información sobre: características, precios, integraciones, seguridad y más. ¿Qué te gustaría saber?";
      this.showSuggestedQuestions = true;
    }

    this.addAssistantMessage(response);
  }

  private isGreeting(message: string): boolean {
    return ['hola', 'buenos días', 'buenas tardes', 'buenas noches'].some(g => message.includes(g));
  }

  private getRandomGreeting(): string {
    return this.greetings[Math.floor(Math.random() * this.greetings.length)];
  }

  private addUserMessage(text: string): void {
    this.messages.push({ text, sender: 'user' });
    this.scrollToBottom();
  }

  private addAssistantMessage(text: string): void {
    this.messages.push({ text, sender: 'assistant' });
    this.scrollToBottom();
  }

  private addLoadingMessage(): void {
    this.messages.push({ text: '', sender: 'assistant', loading: true });
    this.scrollToBottom();
  }

  private removeLoadingMessage(): void {
    const index = this.messages.findIndex(m => m.loading);
    if (index !== -1) this.messages.splice(index, 1);
  }

  private scrollToBottom(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        const container = document.getElementById('chat-messages');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 0);
    }
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    if (this.isOpen) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
