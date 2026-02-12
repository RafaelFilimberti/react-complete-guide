export default function Section({ title, children, ...props }) {
    return (
        <section {...props}>
            {/* ...props tudo o que tiver de css ou outros atributos dentro dessa tags será incluido
 aqui. ex: <Section title="Examples" id='examples' className="">*/}
            <h2>{title}</h2>
            {children}
        </section>
    );
}