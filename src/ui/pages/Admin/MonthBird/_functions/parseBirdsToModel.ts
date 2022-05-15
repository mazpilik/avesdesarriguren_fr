export const parseBirdsToModel = (birds:any) => birds.map(
  (bird:any) => ({ label: bird.name, value: bird.id }),
);
