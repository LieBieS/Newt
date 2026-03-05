// Test fixture: UI component with intentional UX/a11y issues for Newt skills
// - Missing accessible name on button icon
// - Missing form label association
// - Potentially small touch target

export function IconButton(props: { onClick: () => void }) {
  return (
    <button onClick={props.onClick} style={{ width: 28, height: 28 }}>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path d="M2 8h12" />
      </svg>
    </button>
  );
}

export function LoginForm() {
  return (
    <form>
      <div>
        <input id="email" type="email" placeholder="Email" />
      </div>
      <button type="submit">Sign in</button>
    </form>
  );
}
