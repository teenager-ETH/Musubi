import { useMoralis } from "react-moralis";
import networkMapping from "../constants/networkMapping.json";
import React, { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import attestAbi from '../constants/Attest.json'
import {
  Table,
  Thead,
  Tbody,
  Input,
  Text,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import * as ecies25519 from "@kumarargentra/ecies-25519";
import { toUtf8Bytes, toUtf8String } from "ethers/lib/utils";
import { useAtom } from "jotai";
import { identityState, unirepState } from "@/components/CodingPad/state";
import { useNotification } from "web3uikit";

export default function Home() {
  const OverlayOne = () => (
    <ModalOverlay
      bg='blackAlpha.300'
      backdropFilter='blur(10px) hue-rotate(90deg)'
    />
  )
  const { chainId, isWeb3Enabled } = useMoralis();
  const [jobs, setJobs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [overlay, setOverlay] = useState(<OverlayOne />)
  const [email, setEmail] = useState('')
  const [jobSelected, setJobSelected] = useState({})
  const [id] = useAtom(identityState)
  const [unirepUserState] = useAtom(unirepState);
  const dispatch = useNotification();
  const chainString = chainId ? parseInt(chainId).toString() : null;
  const attestAddress = chainId
    ? networkMapping[chainString].Attest
    : null;
  const fromHexString = hexString =>
    new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));

  const handleApply = async (job, email) => {

    setIsRunning(true)
    const enckeyPair = ecies25519.generateKeyPair(
      fromHexString(
        BigNumber.from(id.secretHash).toHexString().slice(2)))
    const encrypted = await ecies25519.encrypt(toUtf8Bytes(email), enckeyPair.publicKey);
    console.log(encrypted)
    const secret = await ecies25519.decrypt(encrypted, enckeyPair.privateKey);
    console.log(toUtf8String(secret))
    console.log(job)
    const { publicSignals, proof } = await unirepUserState.genProveReputationProof({ minRep: job.lvReq.toNumber() })
    const data = await fetch(
      `/api/createApplication?${new URLSearchParams({
        body: JSON.stringify({
          secret: '0x'+Buffer.from(encrypted).toString('hex'),
          jobIdx: job.idx.toHexString(),
          publicSignals, proof
        })
      })}`
    );
    console.log(data)

    setIsRunning(false)
    onClose()
    dispatch({
      type: "success",
      message: "Apply Successfully!",
      title: "Apply Successfully",
      position: "topR",
    });
  }
  const handleChange = (event) => setEmail(event.target.value)

  useEffect(() => {

    const fetchJobs = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(attestAddress, attestAbi, provider);
      // Replace 'getUsers' with your actual smart contract method
      const pool = await contract.getJobPool();

      const allJob = await Promise.all(pool.map((idx) => {
        return contract.job(idx)
      }))
      console.log(allJob)
      setJobs(allJob);
    };
    fetchJobs();
  }, []);



  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Imperial to metric conversion factors</TableCaption>
          <Thead>
            <Tr>
              <Th>Job Description</Th>
              <Th>Level Requirement</Th>
              <Th>Apply</Th>
            </Tr>
          </Thead>
          <Tbody>
            {jobs.map((job, index) => (
              <Tr key={index}>
                <Td>{job.desp}</Td>
                <Td>{job.lvReq.toString()}</Td>
                <Td><Button
                  isLoading={isRunning}
                  loadingText='Sending...'
                  bg='blue.600'
                  _hover={{ bg: 'blue.700' }}
                  className='px-2 py-1 bg-blue-600 text-white rounded-md w-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600'
                  onClick={() => {
                    setJobSelected(job)
                    setOverlay(<OverlayOne />)
                    onOpen()
                  }}>
                  Send
                </Button></Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Apply</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Leave your email</Text>
            <Input value={email} onChange={handleChange}></Input>
          </ModalBody>
          <ModalFooter>
            <Button onClick={() => handleApply(jobSelected, email)}>Send</Button>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};