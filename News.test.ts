import { describe, expect, test} from '@jest/globals';
import { ArticleProps } from './Article';
import { NewsProps, processNewsResponse } from './News';


describe('Testing The Processing Of News Data', () => {
    test('Filter Articles', () => {
        const news: NewsProps[] = [{
            source: {
                id: null,
                name: "Publisher Name"
            },
            title: "Test Article",
            author: "Test Author",
            description: "Article Description",
            urlToImage: "https://www.google.com/image.png",
            url: "https://www.google.com",
            content: "This is the article",
            publishedAt: "2023-06-19T09:09:45Z"
        }]
        const article: ArticleProps[] = [{
            title: "Test Article",
            publisherName: "Publisher Name",
            author: "Test Author",
            description: "Article Description",
            urlToImage: "https://www.google.com/image.png",
            url: "https://www.google.com"
        }]

        expect(processNewsResponse(news)).toEqual(article)
    })
})