import { Grid, Container } from "@mui/material";
/**
 * FormContainer is a reusable component that provides a layout for forms.
 * It wraps its children components within a responsive grid layout using Material-UI's Grid and Container components.
 * 
 * @param {ReactNode} children - The child components to be wrapped within the form container.
 * @returns {JSX.Element} - The rendered form container component.
 */

function FormContainer({ children }) {
  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
}

export default FormContainer;