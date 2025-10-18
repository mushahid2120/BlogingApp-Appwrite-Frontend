import { useLocation } from 'react-router-dom'
import ImageView from '../Components/ImageView'
import parse from "html-react-parser";

export default function Blog() {
  const {title,imageUrl,content}=useLocation().state
  return (
    <main className="min-h-[78vh] m-4">
            <ImageView src={imageUrl} width="w-full" />
            <h2 className="text-xl font-semibold">{title}</h2>
            <hr />
            <div>{parse(content)}</div>
    </main>
  )
}