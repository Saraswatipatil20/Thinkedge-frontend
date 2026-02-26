import { useState, useRef, useEffect } from "react";
import { Button } from "./button";
import { Undo, Redo, Trash, Save, ZoomIn, ZoomOut, Eraser, Pencil, ChevronLeft, ChevronRight, X } from "lucide-react";
import { SketchPicker } from "react-color";
import { Stage, Layer, Line, Text } from "react-konva";
import { useNavigate } from "react-router-dom";

const Whiteboard = () => {
    const [pages, setPages] = useState([[]]);
    const [currentPage, setCurrentPage] = useState(0);
    const [redoStack, setRedoStack] = useState([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [selectedColor, setSelectedColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(3);
    const [tool, setTool] = useState("pen");
    const [zoom, setZoom] = useState(1);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [showModal, setShowModal] = useState(isMobile);
    const navigate = useNavigate();

    const stageRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth < 768) {
                setShowModal(true);
            } else {
                setShowModal(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleMouseDown = (e) => {
        const pos = e.target.getStage().getPointerPosition();
        setIsDrawing(true);
        let newPages = [...pages];
        newPages[currentPage] = [
            ...newPages[currentPage],
            { points: [pos.x, pos.y], color: tool === "eraser" ? "#FFFFFF" : selectedColor, width: tool === "eraser" ? 10 : brushSize },
        ];
        setPages(newPages);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing) return;
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let newPages = [...pages];
        let lastLine = newPages[currentPage][newPages[currentPage].length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        setPages(newPages);
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
        setRedoStack([]);
    };

    const handleUndo = () => {
        if (pages[currentPage].length > 0) {
            let newPages = [...pages];
            let lastLine = newPages[currentPage].pop();
            setRedoStack([...redoStack, lastLine]);
            setPages(newPages);
        }
    };

    const handleRedo = () => {
        if (redoStack.length > 0) {
            let newPages = [...pages];
            newPages[currentPage] = [...newPages[currentPage], redoStack[redoStack.length - 1]];
            setRedoStack(redoStack.slice(0, -1));
            setPages(newPages);
        }
    };

    const handleClear = () => {
        let newPages = [...pages];
        newPages[currentPage] = [];
        setPages(newPages);
        setRedoStack([]);
    };

    const handleSave = () => {
        const uri = stageRef.current.toDataURL();
        const link = document.createElement("a");
        link.href = uri;
        link.download = `whiteboard-page-${currentPage + 1}.png`;
        link.click();
    };

    const handleZoom = (factor) => {
        const newZoom = Math.max(0.5, Math.min(3, zoom + factor));
        setZoom(newZoom);
        stageRef.current.scale({ x: newZoom, y: newZoom });
        stageRef.current.draw();
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            setPages([...pages, []]);
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="flex w-screen bg-gray-900 text-white">
            {/* Modal for Mobile */}
            {isMobile && showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 text-black">
                        <h2 className="text-xl font-semibold mb-4">ThinkEdge Whiteboard</h2>
                        <p className="text-gray-700">This whiteboard works best on larger screens. Rotate your device or use a desktop for a better experience.</p>
                        <button 
     onClick={() => {
         setShowModal(false);
         navigate("/"); // Navigate to the home page
     }} 
     className="mt-4 bg-blue-500 text-white px-4 py-2 rounded flex items-center mx-auto"
 >
     <X className="mr-2" /> Close
 </button>
                       
                       
                    </div>
                </div>
            )}

            {/* Sidebar */}
            {!isMobile && (
                <div className="w-64 bg-gray-800 p-4 flex flex-col gap-4">
                    <h2 className="text-xl font-semibold">ThinkEdge Whiteboard</h2>
                    <Button onClick={handleUndo} disabled={!pages[currentPage].length} className="bg-blue-500"> <Undo /> Undo </Button>
                    <Button onClick={handleRedo} disabled={!redoStack.length} className="bg-green-500"> <Redo /> Redo </Button>
                    <Button onClick={handleClear} className="bg-red-500"> <Trash /> Clear </Button>
                    <Button onClick={handleSave} className="bg-yellow-500"> <Save /> Save </Button>
                    <Button onClick={() => handleZoom(0.1)} className="bg-gray-600"> <ZoomIn /> Zoom In </Button>
                    <Button onClick={() => handleZoom(-0.1)} className="bg-gray-600"> <ZoomOut /> Zoom Out </Button>

                    {/* Brush Color Picker */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium">Brush Color</h3>
                        <SketchPicker color={selectedColor} onChangeComplete={(color) => setSelectedColor(color.hex)} />
                    </div>

                    {/* Tool Selection */}
                    <Button onClick={() => setTool("pen")} className={`bg-gray-600 ${tool === "pen" ? "ring-2 ring-blue-400" : ""}`}><Pencil /> Pen</Button>
                    <Button onClick={() => setTool("eraser")} className={`bg-gray-600 ${tool === "eraser" ? "ring-2 ring-blue-400" : ""}`}><Eraser /> Eraser</Button>
                </div>
            )}

            {/* Whiteboard Canvas */}
            {!isMobile && (
                <div className="flex-1 flex flex-col items-center justify-center h-full">
                     <div className="bg-white rounded-lg shadow-lg overflow-hidden mt-6">
                    <Stage width={1000} height={600} ref={stageRef} onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} scale={{ x: zoom, y: zoom }}>
                        <Layer>
                            {pages[currentPage].map((line, index) => (
                                <Line key={index} points={line.points} stroke={line.color} strokeWidth={line.width} lineCap="round" lineJoin="round" />
                            ))}
                            <Text text="ThinkEdge" x={350} y={200} fontSize={48} fontFamily="Arial" fill="gray" align="center" />
                        </Layer>
                    </Stage>
                </div>
                <div className="flex justify-center mt-4">
        <Button onClick={handlePrevPage} disabled={currentPage === 0} className="bg-gray-700 mx-2"> 
            <ChevronLeft /> Previous Page 
        </Button>
        <span className="mx-4 text-lg font-bold">Page {currentPage + 1}</span>
        <Button onClick={handleNextPage} className="bg-gray-700 mx-2"> 
            Next Page <ChevronRight />
        </Button>
    </div>
</div>
                
            )}
            
        </div>
        
    );
};

export default Whiteboard;
