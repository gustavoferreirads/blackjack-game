export function loadCSS(cssPath: string, cssContent: string): void {
  if (!document.querySelector(`style[data-css-path="${cssPath}"]`)) {
    const style = document.createElement('style');
    style.textContent = cssContent;
    style.setAttribute('data-css-path', cssPath);
    document.head.appendChild(style);
  }
}

export async function loadFile(path: string, extension: string): Promise<any> {
  try {
    const response = await fetch(`${path}${extension}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.text();
  } catch (error) {
    console.error('Failed to load file:', error);
  }
}

export function request(url: string, data: any = {}): any {
  return {
    async get() {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.json();
    },
    async post() {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response.json();
    },
  };
}

export function wait(callback: () => void, ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      callback();
      resolve();
    }, ms);
  });
}

export function formatDollar(amount: number): string {
  return `$${amount.toFixed(0)}`;
}

export const getElementById = (id: string): HTMLElement | null => {
  return document.getElementById(id);
};
