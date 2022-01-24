import { useMemo, useState } from "react";
import {
  Modal,
  Grid,
  Text,
  Input,
  Textarea,
  Button
} from "@nextui-org/react";
// regex
import { validName, validateEmail } from '../../utils/validationInputs'


function ContactForm({ isVisible, handlerClose }) {
  const [ formData, setFormData ] = useState({
      email: '',
      name: '',
      message: ''
  });

  const handleChangeInput = (e) => {
    setFormData({
        ...setFormData,
        [e.target.id]: e.target.value
    })
  }

    const helperEmail = useMemo(() => {
        if (!formData.email) return { 
            text:'', 
            color:'' 
        };
        const isValid = validateEmail(formData.email);
        return { 
            text: isValid ? 'Correct email' : 'Enter a valid email',
            color: isValid ? 'success' : 'error'
        };    
    }, [formData]);


    const helperName = useMemo(() => {
        if (!formData.name) return { 
            text:'', 
            color:'' 
        };

        const isValid = validName(formData.name);
        return { 
            text: isValid ? 'Correct Name' : 'Enter a valid Name',
            color: isValid ? 'success' : 'error'
        };    
    }, [formData]);


  return (
    <div>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={isVisible}
        onClose={handlerClose}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Contact
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={2}>
            <Grid xs={12}>
              <Input
                clearable
                width="100%"
                shadow={false}
                status={helperEmail.color}
                color={helperEmail.color}
                helperColor={helperEmail.color}
                helperText={helperEmail.text}
                type="email"
                label="Email"
                id="email"
                onChange={handleChangeInput}
                placeholder="With regex validation"
              />
            </Grid>
            <Grid xs={12}>
              <Input
                clearable
                width="100%"
                status={helperName.color}
                color={helperName.color}
                helperColor={helperName.color}
                helperText={helperName.text}
                label="Name"
                id="name"
                onChange={handleChangeInput}
                placeholder="Enter your name"
              />
            </Grid>
            <Grid xs={12}>
            <Textarea
                width="100%"
                label="Write your message"
                placeholder="enter your message"
                onChange={handleChangeInput}
                id="message"
            />
            </Grid>
          </Grid.Container>
        </Modal.Body>
        <Modal.Footer>
            <Button auto flat color="error" onClick={handlerClose}>
                Close
            </Button>
            <Button auto>
                Send
            </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ContactForm;
