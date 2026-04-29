import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('ds-text-input')
export class DsTextInput extends LitElement {
  static styles = css`
    :host { display: block; }
    .input {
      font: 400 14px/20px var(--font-base);
      border: 1px solid rgb(var(--border-2));
      border-radius: 8px;
      padding: 10px 12px;
      background: #fff;
      color: rgb(var(--fg-1));
      outline: none;
      transition: border-color 150ms, box-shadow 150ms;
      width: 100%;
      box-sizing: border-box;
      resize: vertical;
    }
    .input:focus {
      border-color: rgb(var(--color-primary-500));
      box-shadow: 0 0 0 3px rgb(var(--color-primary-200) / .55);
    }
    .input::placeholder { color: rgb(var(--fg-3)); }
    .input:disabled { opacity: .5; cursor: not-allowed; background: rgb(var(--bg-muted)); }
  `;

  @property({ reflect: true }) type = 'text';
  @property({ reflect: true }) placeholder = '';
  @property() value = '';
  @property({ type: Number, reflect: true }) rows = 3;
  @property({ type: Boolean, reflect: true }) disabled = false;

  render() {
    if (this.type === 'textarea') {
      return html`
        <textarea
          class="input"
          .value=${this.value}
          placeholder=${this.placeholder}
          rows=${this.rows}
          ?disabled=${this.disabled}
          @input=${this._handleInput}
        ></textarea>
      `;
    }
    if (this.type === 'select') {
      return html`
        <select class="input" ?disabled=${this.disabled} @change=${this._handleInput}>
          <slot></slot>
        </select>
      `;
    }
    return html`
      <input
        class="input"
        type=${this.type}
        .value=${this.value}
        placeholder=${this.placeholder}
        ?disabled=${this.disabled}
        @input=${this._handleInput}
      />
    `;
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('ds-input', {
      detail: { value: this.value },
      bubbles: true, composed: true,
    }));
  }
}
