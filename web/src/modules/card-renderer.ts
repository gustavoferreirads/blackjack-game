/* eslint-disable prettier/prettier */
import { backCard } from '../constants/back-card';
import { ApiUrl } from '../constants/url';
import { getElementById, wait } from './util';
export class CardRenderer {
  MIN_LENGTH = 2;


  async renderCards(
    handDiv: HTMLElement,
    cards: { name: string }[],
    delay = 500,
  ): Promise<void> {
    if (cards.length < this.MIN_LENGTH) {
      cards.push(backCard);
    }else{
       getElementById(`${handDiv.id}-${backCard.name}`)?.remove();
    }

    for (const card of cards) {
      if (!getElementById(`${handDiv.id}-${card.name}`)) {
          await wait(() => {
            this.addCardImage(handDiv, card.name);
          }, delay);
      }
    }
  }
  addCardImage(handDiv: HTMLElement, name: string): void {
    const cardImg = document.createElement('img');
    cardImg.id = `${handDiv.id}-${name}`;
    cardImg.className = 'card';
    const cardName = name.replace(/10/g, '0');
    cardImg.src = `${ApiUrl.DECK_API_URL}${cardName}.png`;
    cardImg.style.opacity = '0';
    handDiv.appendChild(cardImg);
    requestAnimationFrame(() => {
      setTimeout(() => {
        cardImg.style.opacity = '1';
      }, 100);
    });
  }
}
