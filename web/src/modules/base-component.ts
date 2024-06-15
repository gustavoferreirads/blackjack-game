import { loadCSS, loadFile } from './util';

export class BaseComponent {
  static instance: any;
  isLoaded = false;
  _html = '';
  _css = '';
  app: any;
  name: string;

  constructor(app: BaseComponent | any, name: string) {
    this.app = app;
    this.name = name;
    this.onMount();
  }

  async onMount(): Promise<void> {
    if (!this.isLoaded) {
      const html = await loadFile(this.name, '.html');
      const css = await loadFile(this.name, '.css');
      this._html = html;
      this._css = css;
      this.isLoaded = true;
      loadCSS(this.name + `.css`, this._css);
    }
  }

  async render(_arg?: any): Promise<void> {
    try {
      await this.onMount();
      this.app.render(this);
    } catch (e) {
      console.error(e);
    }
    this.onLoad();
  }

  onLoad(): void {}
}
