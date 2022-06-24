export const THEMES = [
  {
    id: "material",
    name: "Material",
  },
  {
    id: "3024-night",
    name: "3024 Night",
  },
  {
    id: "abbott",
    name: "Abbott",
  },
  {
    id: "abcdef",
    name: "Abcdef",
  },
  {
    id: "ayu-dark",
    name: "Ayu Dark",
  },
  {
    id: "ayu-mirage",
    name: "Ayu Mirage",
  },
  {
    id: "base16-dark",
    name: "Base16 Dark",
  },
  {
    id: "blackboard",
    name: "Blackboard",
  },
  {
    id: "cobalt",
    name: "Cobalt",
  },
  {
    id: "colorforth",
    name: "Colorforth",
  },
  {
    id: "dracula",
    name: "Dracula",
  },
  {
    id: "erlang-dark",
    name: "Erlang Dark",
  },
  {
    id: "hopscotch",
    name: "Hopscotch",
  },
  {
    id: "isotope",
    name: "Isotope",
  },
  {
    id: "mdn-like",
    name: "Mdn Like",
  },
  {
    id: "monokai",
    name: "Monokai",
  },
  {
    id: "neo",
    name: "Neo",
  },
  {
    id: "night",
    name: "Night",
  },
  {
    id: "nord",
    name: "Nord",
  },
  {
    id: "the-matrix",
    name: "The Matrix",
  },
  {
    id: "twilight",
    name: "Twilight",
  },
  {
    id: "yeti",
    name: "Yeti",
  },
];

export const LANGUAGES = [
  {
    name: "HTML",
    mode: "htmlmixed",
  },
  {
    name: "CSS",
    mode: "css",
  },
  {
    name: "JavaScript",
    mode: "javascript",
  },
  {
    name: "Python",
    mode: "python",
  },
  {
    name: "C/C++",
    mode: "clike",
  },
  {
    name: "PHP",
    mode: "php",
  },
  {
    name: "PowerShell",
    mode: "powershell",
  },
  {
    name: "Dart",
    mode: "dart",
  },
  {
    name: "Django",
    mode: "django",
  },
  {
    name: "Shell",
    mode: "shell",
  },
  {
    name: "SQL",
    mode: "sql",
  },
  {
    name: "Markdown",
    mode: "markdown",
  },
];

export const defaultCode = `
const pluckDeep = key => obj => key.split('.').reduce((accum, key) => accum[key], obj)

const compose = (...fns) => res => fns.reduce((accum, next) => next(accum), res)

const unfold = (f, seed) => {
  const go = (f, seed, acc) => {
    const res = f(seed)
    return res ? go(f, res[1], acc.concat([res[0]])) : acc
  }
  return go(f, seed, [])
}`;
