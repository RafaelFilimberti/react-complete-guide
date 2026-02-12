import { CORE_CONCEPTS } from "../data";
import CoreConcept from "./CoreConcepts";

export default function CoreConcepts() {
    return (
        <section id='core-concepts'>
            <h2>Core concepts</h2>
            <ul>
                {CORE_CONCEPTS.map((conceptItem) =>
                    <CoreConcept key={conceptItem.title} {...conceptItem} />)}
                {/* <CoreConcept
                      title={CORE_CONCEPTS[0].title}
                      description={CORE_CONCEPTS[0].description}
                      image={CORE_CONCEPTS[0].image}
                    />
                    {/* abaixo faz a mesma coisa que acima, 
                    com o uso do spread para adicionar os valores */}
                {/* <CoreConcept {...CORE_CONCEPTS[1]} />
                    <CoreConcept {...CORE_CONCEPTS[2]} />
                    <CoreConcept {...CORE_CONCEPTS[3]} />  */}
                {/* <CoreConcept
                      title={CORE_CONCEPTS[1].title}
                      description={CORE_CONCEPTS[1].description}
                      image={CORE_CONCEPTS[1].image}
                    />
                        <CoreConcept
                      title={CORE_CONCEPTS[2].title}
                      description={CORE_CONCEPTS[2].description}
                      image={CORE_CONCEPTS[2].image}
                    />
                        <CoreConcept
                      title={CORE_CONCEPTS[3].title}
                      description={CORE_CONCEPTS[3].description}
                      image={CORE_CONCEPTS[3].image}
                    /> */}
            </ul>
        </section>
    );
}