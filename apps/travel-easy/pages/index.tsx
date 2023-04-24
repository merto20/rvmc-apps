import path from 'path';
path.resolve('./next.config.js');

export function Index() {
  return (
    <section className="p-5">
      <h1 className="text-red-700">Welcome</h1>
    </section>
  );
}

export default Index;
