import GithubIcon from "./GithubIcon";

export default function AppHeader() {
  return (
    <div className="app-header">
      <h1>
        HTML Tags Memory Test{" "}
        <a href="//github.com/sybers">
          <GithubIcon />
        </a>
      </h1>
      <p>How many HTML tags can you remember?</p>
    </div>
  );
}
