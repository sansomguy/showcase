import { component$ } from "@builder.io/qwik";
import { RequestHandler, useContent } from "@builder.io/qwik-city";

export const onGet: RequestHandler  = async (event) => {
    event.headers.set('Content-Type', 'application/xml');

    event.send(200,`
              <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url><loc>https://www.joshs.au/</loc></url>
            <url><loc>https://www.joshs.au/work/</loc></url>
            <url><loc>https://www.joshs.au/work/projects/auto-admin-car-wash/</loc></url>
            <url><loc>https://www.joshs.au/work/projects/my-website/</loc></url>
            <url><loc>https://www.joshs.au/thoughts/favourite-tools/</loc></url>
            <url><loc>https://www.joshs.au/thoughts/</loc></url>
        </urlset>`);
}