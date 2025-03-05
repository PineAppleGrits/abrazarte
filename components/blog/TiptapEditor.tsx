"use client";

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Strike from "@tiptap/extension-strike";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Quote,
  Code,
  Code2,
  Table as TableIcon,
  Type,
  Minus,
  Palette,
  X,
  FileText,
  MoreHorizontal,
  Scissors,
  Eraser,
  RotateCcw,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";
import ResizableImage from "./ResizableImage";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }: TiptapEditorProps) => {
  const editorClass = `prose prose-lg max-w-none min-h-[400px] focus:outline-none p-4 editor-content`;
  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: editorClass,
      },
    },
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      ResizableImage.configure({
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-4",
        },
      }),
      Placeholder.configure({
        placeholder: "Escribe el contenido de tu artículo aquí...",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph", "image"],
        alignments: ["left", "center", "right", "justify"],
      }),
      Underline,
      Strike,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      Typography,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }
  const addImage = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target?.files?.[0];
      if (!file) return;

      try {
        const { data } = await axios.post("/api/cloudinary-signature");
        const { signature, timestamp, apiKey } = data;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
        if (!cloudName) {
          console.error("Cloudinary cloud name not set in environment variables.");
          return;
        }
        const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          body: formData,
        });
        const uploadResult = await uploadResponse.json();

        if (uploadResult.secure_url) {
          editor.chain().focus().setImage({ src: uploadResult.secure_url }).run();
        } else {
          console.error("Cloudinary upload failed:", uploadResult);
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    };

    input.click();
  };
  const setLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("URL del enlace:", previousUrl);

    if (url === null) {
      return;
    }

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3 }).run();
  };

  const addHorizontalRule = () => {
    editor.chain().focus().setHorizontalRule().run();
  };

  return (
    <div className="border rounded-md">
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white border shadow-lg rounded-md flex p-1 gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive("bold") ? "bg-gray-200" : ""}
              type="button"
            >
              <Bold className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive("italic") ? "bg-gray-200" : ""}
              type="button"
            >
              <Italic className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={setLink}
              className={editor.isActive("link") ? "bg-gray-200" : ""}
              type="button"
            >
              <LinkIcon className="h-4 w-4" />
            </Button>
          </div>
        </BubbleMenu>
      )}

      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
        {/* Text Formatting Group */}
        <div className="flex items-center gap-1 mr-1 border-r pr-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "bg-gray-200" : ""}
            type="button"
            title="Negrita"
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "bg-gray-200" : ""}
            type="button"
            title="Cursiva"
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={editor.isActive("underline") ? "bg-gray-200" : ""}
            type="button"
            title="Subrayado"
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "bg-gray-200" : ""}
            type="button"
            title="Tachado"
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" type="button" title="Color de texto">
                <Palette className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
              <Tabs defaultValue="text">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="text">Texto</TabsTrigger>
                  <TabsTrigger value="highlight">Resaltado</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="mt-2">
                  <div className="grid grid-cols-5 gap-1">
                    {[
                      "#000000",
                      "#ef4444",
                      "#f97316",
                      "#eab308",
                      "#84cc16",
                      "#22c55e",
                      "#14b8a6",
                      "#0ea5e9",
                      "#6366f1",
                      "#a855f7",
                      "#ec4899",
                      "#f43f5e",
                      "#64748b",
                      "#4b5563",
                      "#ffffff",
                    ].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full"
                        style={{ background: color, border: color === "#ffffff" ? "1px solid #e5e7eb" : "none" }}
                        onClick={() => editor.chain().focus().setColor(color).run()}
                        type="button"
                      />
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="highlight" className="mt-2">
                  <div className="grid grid-cols-5 gap-1">
                    {[
                      "#fff176",
                      "#ffcc80",
                      "#81d4fa",
                      "#a5d6a7",
                      "#e6ee9c",
                      "#fff59d",
                      "#ffab91",
                      "#b39ddb",
                      "#9fa8da",
                      "#90caf9",
                      "#ce93d8",
                      "#ef9a9a",
                      "#bcaaa4",
                      "#eeeeee",
                      "transparent",
                    ].map((color) => (
                      <button
                        key={color}
                        className="w-8 h-8 rounded-full"
                        style={{
                          background: color,
                          border: color === "transparent" ? "1px solid #e5e7eb" : "none",
                          position: "relative",
                        }}
                        onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                        type="button"
                      >
                        {color === "transparent" && (
                          <X className="h-4 w-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                        )}
                      </button>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </PopoverContent>
          </Popover>
        </div>

        {/* Paragraph Formatting Group */}
        <div className="flex items-center gap-1 mr-1 border-r pr-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" type="button" title="Encabezados">
                <Type className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Estilos de texto</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive("heading", { level: 1 }) ? "bg-gray-100" : ""}
              >
                <Heading1 className="h-4 w-4 mr-2" />
                <span>Encabezado 1</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive("heading", { level: 2 }) ? "bg-gray-100" : ""}
              >
                <Heading2 className="h-4 w-4 mr-2" />
                <span>Encabezado 2</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive("heading", { level: 3 }) ? "bg-gray-100" : ""}
              >
                <Heading3 className="h-4 w-4 mr-2" />
                <span>Encabezado 3</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive("paragraph") ? "bg-gray-100" : ""}
              >
                <FileText className="h-4 w-4 mr-2" />
                <span>Párrafo normal</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive("blockquote") ? "bg-gray-100" : ""}
              >
                <Quote className="h-4 w-4 mr-2" />
                <span>Cita</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive("codeBlock") ? "bg-gray-100" : ""}
              >
                <Code2 className="h-4 w-4 mr-2" />
                <span>Bloque de código</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
            type="button"
            title="Lista con viñetas"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
            type="button"
            title="Lista numerada"
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={editor.isActive("blockquote") ? "bg-gray-200" : ""}
            type="button"
            title="Cita"
          >
            <Quote className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={editor.isActive("code") ? "bg-gray-200" : ""}
            type="button"
            title="Código inline"
          >
            <Code className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment Group */}
        <div className="flex items-center gap-1 mr-1 border-r pr-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={editor.isActive({ textAlign: "left" }) ? "bg-gray-200" : ""}
            type="button"
            title="Alinear a la izquierda"
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={editor.isActive({ textAlign: "center" }) ? "bg-gray-200" : ""}
            type="button"
            title="Centrar"
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={editor.isActive({ textAlign: "right" }) ? "bg-gray-200" : ""}
            type="button"
            title="Alinear a la derecha"
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={editor.isActive({ textAlign: "justify" }) ? "bg-gray-200" : ""}
            type="button"
            title="Justificar"
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
        </div>

        {/* Insert Group */}
        <div className="flex items-center gap-1 mr-1 border-r pr-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={setLink}
            className={editor.isActive("link") ? "bg-gray-200" : ""}
            type="button"
            title="Insertar enlace"
          >
            <LinkIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={addImage} type="button" title="Insertar imagen">
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={addTable} type="button" title="Insertar tabla">
            <TableIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={addHorizontalRule} type="button" title="Insertar línea horizontal">
            <Minus className="h-4 w-4" />
          </Button>
        </div>

        {/* More Options Group */}
        <div className="flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" type="button" title="Más opciones">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => editor.chain().focus().clearNodes().run()}>
                <Eraser className="h-4 w-4 mr-2" />
                <span>Limpiar formato</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                <Scissors className="h-4 w-4 mr-2" />
                <span>Quitar todas las marcas</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => editor.chain().focus().clearContent().run()}>
                <RotateCcw className="h-4 w-4 mr-2" />
                <span>Limpiar contenido</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            type="button"
            title="Deshacer"
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            type="button"
            title="Rehacer"
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {editor && (
        <FloatingMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="bg-white border shadow-lg rounded-md flex p-1 gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              type="button"
            >
              <Heading1 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              type="button"
            >
              <Heading2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} type="button">
              <List className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().toggleOrderedList().run()} type="button">
              <ListOrdered className="h-4 w-4" />
            </Button>
          </div>
        </FloatingMenu>
      )}

      <EditorContent editor={editor} className="prose max-w-none" />

      {editor && editor.isActive("table") && (
        <div className="bg-gray-50 border-t p-2 flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().addColumnBefore().run()} type="button">
            Añadir columna antes
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().addColumnAfter().run()} type="button">
            Añadir columna después
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().deleteColumn().run()} type="button">
            Eliminar columna
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().addRowBefore().run()} type="button">
            Añadir fila antes
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().addRowAfter().run()} type="button">
            Añadir fila después
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().deleteRow().run()} type="button">
            Eliminar fila
          </Button>
          <Button variant="ghost" size="sm" onClick={() => editor.chain().focus().deleteTable().run()} type="button">
            Eliminar tabla
          </Button>
        </div>
      )}
    </div>
  );
};

export default TiptapEditor;
