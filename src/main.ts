import { toBlob } from 'html-to-image'
import './style.css'

const main = async () => {
  const form = document.getElementById('form') as HTMLFormElement;
  const page = document.getElementById('page') as HTMLDivElement;
  const resultInfo = document.getElementById('result-info') as HTMLPreElement;
  const resultImage = document.getElementById('result-image') as HTMLImageElement;

  const capturePage = async () => {
    const checkedTypeInput = form.querySelector<HTMLInputElement>('input[name="type"]:checked');
    if (!checkedTypeInput) {
      alert('Required select a "type"');
      return;
    }

    const type = checkedTypeInput.value === 'undefined' ? undefined : checkedTypeInput.value;
    const options = {
      type,
    }

    console.log(options);

    const blob = await toBlob(page, options)
    if (!blob) {
      alert('Failed to capture the page');
      return;
    }

    console.log(blob);

    resultInfo.textContent = `options:
    type: ${type}
generated blob:
    type: ${blob.type}
    size: ${blob.size} bytes
    url: ${URL.createObjectURL(blob)}`;
    resultImage.src = URL.createObjectURL(blob);
  }

  form.addEventListener('submit', (event: Event) => {
    event.preventDefault();
    capturePage();
  })
}

main();
