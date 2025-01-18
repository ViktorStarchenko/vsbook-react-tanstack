import Accordion from "./Accordion/Accordion";

export default function Test() {
    return (
        <>
            <div className="wrapper-1220">
                <h2>Accordion Text</h2>
                <Accordion>
                    <Accordion.Item id="test">
                        <Accordion.Title>Lorem ipsum dolor.</Accordion.Title>
                        <Accordion.Content >
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab et in odit perferendis vel?</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab et in odit perferendis vel?</p>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item id="test-2">
                        <Accordion.Title>Lorem ipsum dolor. Lorem ipsum dolor.</Accordion.Title>
                        <Accordion.Content >
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque distinctio et officiis saepe. Adipisci animi asperiores atque distinctio, dolorum neque.</p>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis harum ipsam nobis praesentium quibusdam ratione saepe sunt vero? Ad aliquid aspernatur aut culpa cum delectus doloremque excepturi fugit illum incidunt laudantium magnam, odio, officia qui quidem repudiandae sapiente tempora ullam.</p>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    )
}