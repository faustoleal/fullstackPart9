interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBasic extends CoursePartBase {
  description: string;
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBase {
  description: string;
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBase {
  description: string;
  requirements: string[];
  kind: "special";
}

type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;

const App = () => {
  const courseName = "Half Stack application development";

  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic",
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group",
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic",
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial:
        "https://type-level-typescript.com/template-literal-types",
      kind: "background",
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special",
    },
  ];

  const totalExercises = courseParts.reduce(
    (sum, part) => sum + part.exerciseCount,
    0
  );

  return (
    <div>
      <Header name={courseName} />
      <Content courseParts={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

const Header = ({ name }: { name: string }) => {
  return <h1>{name}</h1>;
};

const Part = ({ key, part }: { key: string; part: CoursePart }) => {
  switch (part.kind) {
    case "basic":
      return (
        <div key={key}>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>{part.description}</p>
        </div>
      );
    case "group":
      return (
        <div key={key}>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>{`project exercises ${part.groupProjectCount}`}</p>
        </div>
      );
    case "background":
      return (
        <div key={key}>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>{part.description}</p>
          <p>{`submit to ${part.backgroundMaterial}`}</p>
        </div>
      );
    case "special":
      return (
        <div key={key}>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
          </p>
          <p>{part.description}</p>
          <p>
            required skills:{" "}
            {part.requirements.map((req) => (
              <span key={req}>{req}, </span>
            ))}
          </p>
        </div>
      );
  }
};

const Content = ({ courseParts }: { courseParts: Array<CoursePart> }) => {
  return (
    <div>
      {courseParts.map((p) => (
        <Part key={p.name} part={p} />
      ))}
    </div>
  );
};

const Total = ({ total }: { total: number }) => {
  return <p>Number of excercises {total}</p>;
};

export default App;
