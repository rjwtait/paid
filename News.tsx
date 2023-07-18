import { ArticleProps } from "./Article"

type SourceProps = {
    id: string | null
    name: string
}

export type NewsProps = {
    content: string
    publishedAt: string
    source: SourceProps
} & ArticleProps
  
export function processNewsResponse(articles: any) {
    return articles.map((item: NewsProps) => {
        const {content, publishedAt, source, ...article} = item
        article.publisherName = source.name
        return article
    })
}