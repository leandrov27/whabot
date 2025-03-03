// shadcn-ui
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

// ----------------------------------------------------------------------

export default function NoResultsFoundAlert() {
  return (
    <Alert>
      <AlertTitle>🍃 Sin Resultados</AlertTitle>
      <AlertDescription>
        No se han encontrado registros en la base de datos.
      </AlertDescription>
    </Alert>
  );
}
