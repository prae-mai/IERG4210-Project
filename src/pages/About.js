import { useDocumentTitle } from "../utils/useDocumentTitle";

function About() {
	useDocumentTitle("About");

	return (
		<div>
			<p>Welcome to Dittowo's, which only exists because somebody (me) needed to create a shopping website for a course project.</p>
		</div>
	);
}

export default About;