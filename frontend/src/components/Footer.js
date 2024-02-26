import React from "react";
import { Container, Grid, Typography } from "@material-ui/core";
/**
 * The above code defines a Footer component in JavaScript that renders a footer element with a
 * copyright notice.
 * @returns The Footer component is returning a footer element containing a Container component, which
 * contains a Grid component. Inside the Grid component, there is a Grid item containing a Typography
 * component. The Typography component displays the text "Copyright © FooTshop" with a variant of
 * "body1", color of "textSecondary", and alignment set to "center".
 */

function Footer() {
  return (
    <footer>
      <Container>
        <Grid container justifyContent="center">
          <Grid item>
            <Typography variant="body1" color="textSecondary" align="center">
              Copyright &copy; FooTshop
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}

export default Footer;