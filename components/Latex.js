import 'katex/dist/katex.min.css'
import { Latex as LatexComponent } from 'react-latex'

export const Latex = ({ children }) => {
  console.log(children)
  return <LatexComponent> {children} </LatexComponent>
}
