import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
} from "@tanstack/react-router";

import appCss from "../app.css?url";

import { pageLayout, container, title, subtitle, buttonPrimary, buttonSecondary, spacing } from "./-styles";
import { appHomeHref } from "@/lib/base-path";

function NotFoundComponent() {
  return (
    <div className={pageLayout({ variant: "notFound" })}>
      <div className={container()}>
        <h1 className={title({ variant: "notFound" })}>404</h1>

        <h2 className={title({ variant: "error" })}>Page not found</h2>

        <p className={subtitle()}>The page you're looking for doesn't exist or has been moved.</p>

        <div className={spacing({ mt: 6 })}>
          <Link to="/" className={buttonPrimary()}>
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className={pageLayout({ variant: "error" })}>
      <div className={container()}>
        <h1 className={title({ variant: "error" })}>This page didn't load</h1>

        <p className={subtitle()}>
          Something went wrong on our end. You can try refreshing or head back home.
        </p>

        <div className={spacing({ mt: 6, flex: "center" })}>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className={buttonPrimary()}
          >
            Try again
          </button>

          <a href={appHomeHref()} className={buttonSecondary()}>
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Investry" },
      { name: "description", content: "Investry dashboard application" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <Outlet />
    </QueryClientProvider>
  );
}
