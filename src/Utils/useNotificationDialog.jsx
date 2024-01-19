import React, { useState } from "react";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography } from "@material-tailwind/react";

function useNotificationDialog() {

  const [promise, setPromise] = useState(null); // promise == null

  const acceptNotificationDialog = () => new Promise((resolve, reject) => {
    setPromise({ resolve });  // promise == Promise .La variable de estado promise se setea como Promise y permite ver el componente <Dialog/>
  });

  const handleClose = () => {
    setPromise(null);
  };

  const handleAccept = () => {
    promise?.resolve(true); // promise ejecuta el metodo resolve y devuelve true.
    handleClose();
  };

  // const handleCancel = () => {
  //   promise?.resolve(false); // promise ejecuta el metodo resolve y devuelve true.
  //   handleClose();
  // };

  const NotificationDialog = ({ title="Titulo", message="Mensaje de notificacion" }) => (
    <Dialog open={promise !== null} className="" size="lg">
      <DialogHeader className="justify-center">
        <Typography variant="h5" color="blue-gray" className="text-center">
          {title}
        </Typography>
      </DialogHeader>
      <DialogBody divider className="grid place-items-center gap-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="h-16 w-16 p-1" fill="#4CA660" viewBox="0 0 24 24" >
          <path d="M12 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm6.25 8.891l-1.421-1.409-6.105 6.218-3.078-2.937-1.396 1.436 4.5 4.319 7.5-7.627z" />
        </svg>
        <Typography className="text-center font-normal">
          {message}
        </Typography>
      </DialogBody>
      <DialogFooter className="flex justify-center">
        {/* <Button variant="text" color="blue-gray" onClick={handleClose}>
          close
        </Button> */}
        <Button variant="gradient" onClick={handleAccept}>
          Aceptar
        </Button>
      </DialogFooter>
    </Dialog>
  );
  return [ NotificationDialog, acceptNotificationDialog ];
}

export default useNotificationDialog;
