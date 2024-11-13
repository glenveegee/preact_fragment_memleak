# `Fragment induced memory leak demo`

## Getting Started

### Installation

Install the node dependencies after downloading the repo

- `npm install`

### Running the memory leak demo

- `npm run dev` - Starts a dev server at http://localhost:5173/

### Memory profiling tests

Compare the memory profile for a normal version and a leaky version of the app when rendering posts

1. `Posts` component is NOT leaky as it doesn't return a fragment (profile the component here: http://localhost:5173/)

2. `LeakyPosts` component HAS A MEMORY LEAK since it returns a fragment at the top level of the component (profile the component here: http://localhost:5173/leaky)

## Observations

1. Leaky components return fragments

    Examples:

    ```jsx
    // EXAMPLE 1
    return <>{renderPosts(posts)}</>

    // EXAMPLE 2
    return <Fragment>{renderPosts(posts)}</Fragment>
    ```

2. Non-leaky components can have fragments as long as they're nested and no nested component returns a fragment at the top level

    Examples:

    ```jsx
    // EXAMPLE 1
    return (
        <div class="posts">
            <h1>Leaky posts demo</h1>
            <section>
                {renderPosts(posts)}
            </section>
        </div>
    );

    // EXAMPLE 2
    return (
        <div class="posts">
            <>  {/* NESTED FRAGMENT IS FINE */}
                <h1>Leaky posts demo</h1>
                <section>
                    {renderPosts(posts)}
                </section>
            </>
        </div>
    );

    // EXAMPLE 3
    return renderPosts(posts)

    // EXAMPLE 4
    return <div>{renderPosts(posts)}</div>

    // EXAMPLE 5
    return [<>{renderPosts(posts)}</>]
    ```
