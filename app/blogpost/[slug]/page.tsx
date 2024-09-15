import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import React from 'react'
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import matter from "gray-matter"
import fs from "fs"
import Onthispage from '@/components/Onthispage'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from "rehype-pretty-code"
import { transformerCopyButton } from '@rehype-pretty/transformers';


export default async function blogpost({ params }: { params: { slug: string } }) {

    const Processor = unified()
        .use(remarkParse)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeStringify)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings)
        .use(rehypePrettyCode , {
            theme: 
                'material-theme-ocean'
              , transformers: [
                transformerCopyButton({
                  visibility: 'always',
                  feedbackDuration: 3_000,
                }),
              ],
        })
          


    const filepath = `content/${params.slug}.md`;
    // console.log('Filepath:', filepath);

    const filecontent = fs.readFileSync(filepath, "utf-8");
    // console.log('File Content:', filecontent);

    // Use gray-matter to parse the file content
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { data, content } = matter(filecontent);
    // console.log('Parsed Frontmatter:', data);  // Check the parsed frontmatter
    // console.log('Parsed Markdown Content:', content);  // Check the markdown content

    let htmlcontent = ""; // Declare htmlcontent outside

    // try {
    htmlcontent = (await Processor.process(content)).toString();
    //     console.log('HTML Content:', htmlcontent);  // Log the HTML output
    // } catch (error) {
    //     console.error('Error processing markdown to HTML:', error);
    // }

    return (
        <MaxWidthWrapper className='prose dark:prose-invert'>
            <div className='flex gap-4'>
                <div className='px-10 pt-10 md:w-[78%] w-full'>
                    <h1>{data.title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: htmlcontent }}></div>
                </div>
                <Onthispage  className="" htmlcontent={ htmlcontent} />
            </div>
        </MaxWidthWrapper>
    );
}
