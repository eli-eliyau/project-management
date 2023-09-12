import { Grid, Card, CardContent, Typography } from '@mui/material';

function ProjectCard( project:any ) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{project.name}</Typography>
        <Typography>{project.description}</Typography>
        <Typography>Clients: {project.clients}</Typography>
      </CardContent>
    </Card>
  );
}

function Projects() {

  const projects = [{name:'eli',description:123,clients:'sss'},{name:'eli',description:123,clients:'sss'} ,{name:'eli',description:123,clients:'sss'}]
    //... מערך פרויקטים 

  return (
    <Grid container spacing={4}>
      {projects.map(project => (
        <Grid  item xs={12} sm={6} md={4}>
          <ProjectCard project={project} />
        </Grid>
      ))}
    </Grid>
  );

}

export default Projects;