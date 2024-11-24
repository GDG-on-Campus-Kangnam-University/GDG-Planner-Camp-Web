/* eslint-disable @typescript-eslint/no-unused-vars */
// components/MarkdownRenderer.jsx
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const MarkdownRenderer = ({ markdownContent }: { markdownContent: string }) => {
  return (
    <div className="prose prose-lg dark:prose-dark">
      <ReactMarkdown
        remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
        components={{
          // 헤더
          h1: ({ node, ...props }) => (
            <h1 className="my-4 text-4xl font-bold" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="my-3 text-3xl font-semibold" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="my-2 text-2xl font-semibold" {...props} />
          ),
          h4: ({ node, ...props }) => (
            <h4 className="my-2 text-xl font-semibold" {...props} />
          ),
          h5: ({ node, ...props }) => (
            <h5 className="my-1 text-lg font-semibold" {...props} />
          ),
          h6: ({ node, ...props }) => (
            <h6 className="my-1 text-base font-semibold" {...props} />
          ),

          // 단락
          p: ({ node, ...props }) => (
            <p className="my-2 text-base leading-relaxed" {...props} />
          ),

          // 링크
          a: ({ node, ...props }) => (
            <a
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // 목록
          ul: ({ node, ...props }) => (
            <ul className="my-2 list-inside list-disc" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="my-2 list-inside list-decimal" {...props} />
          ),
          li: ({ node, ...props }) => <li className="my-1" {...props} />,

          // 인용문
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="my-4 border-l-4 border-gray-300 pl-4 italic"
              {...props}
            />
          ),

          // 코드 블록
          code: ({ node, className, children, ...props }) => {
            return (
              <pre className="my-4 overflow-auto rounded bg-gray-800 p-4 text-gray-100">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            )
          },

          // 수평선
          hr: ({ node, ...props }) => (
            <hr className="my-4 border-gray-300" {...props} />
          ),

          //   // 이미지
          //   img: ({ node, ...props }) => (
          //     <Image
          //       className="my-4 rounded"
          //       {...props}
          //       alt={props.alt || ''}
          //       width={600} // 적절한 너비로 조정
          //       height={400} // 적절한 높이로 조정
          //       // 필요한 경우 추가 속성 설정
          //     />
          //   ),

          // 테이블
          table: ({ node, ...props }) => (
            <table
              className="my-4 min-w-full divide-y divide-gray-200"
              {...props}
            />
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-50" {...props} />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-gray-200 bg-white" {...props} />
          ),
          tr: ({ node, ...props }) => <tr {...props} />,
          th: ({ node, ...props }) => (
            <th
              className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
              {...props}
            />
          ),

          // 기타 인라인 요소
          strong: ({ node, ...props }) => (
            <strong className="font-semibold" {...props} />
          ),
          em: ({ node, ...props }) => <em className="italic" {...props} />,
          del: ({ node, ...props }) => (
            <del className="text-red-500 line-through" {...props} />
          ),
          // 추가적인 인라인 요소들을 여기에 추가 가능
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer
