/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus, GripVertical } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import {
  setSections,
  deleteSection,
  deleteChapter,
  openSectionModal,
  openChapterModal,
} from "@/state";

export default function DroppableComponent() {
  const dispatch = useAppDispatch();
  const { sections } = useAppSelector((state) => state.global.courseEditor);

  const handleSectionDragEnd = (result: any) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedSections = [...sections];
    const [reorderedSection] = updatedSections.splice(startIndex, 1);
    updatedSections.splice(endIndex, 0, reorderedSection);
    dispatch(setSections(updatedSections));
  };

  const handleChapterDragEnd = (result: any, sectionIndex: number) => {
    if (!result.destination) return;

    const startIndex = result.source.index;
    const endIndex = result.destination.index;

    const updatedSections = [...sections];
    const updatedChapters = [...updatedSections[sectionIndex].chapters];
    const [reorderedChapter] = updatedChapters.splice(startIndex, 1);
    updatedChapters.splice(endIndex, 0, reorderedChapter);
    updatedSections[sectionIndex].chapters = updatedChapters;
    dispatch(setSections(updatedSections));
  };

  return (
    <DragDropContext onDragEnd={handleSectionDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <section ref={provided.innerRef} {...provided.droppableProps}>
            {sections.map((section: Section, sectionIndex: number) => (
              <Draggable
                key={section.sectionId}
                draggableId={section.sectionId}
                index={sectionIndex}
              >
                {(draggableProvider) => (
                  <section
                    ref={draggableProvider.innerRef}
                    {...draggableProvider.draggableProps}
                    className={`droppable-section ${
                      sectionIndex % 2 === 0
                        ? "droppable-section--even"
                        : "droppable-section--odd"
                    }`}
                  >
                    <SectionHeader
                      section={section}
                      sectionIndex={sectionIndex}
                      dragHandleProps={draggableProvider.dragHandleProps}
                    />

                    <DragDropContext
                      onDragEnd={(result) =>
                        handleChapterDragEnd(result, sectionIndex)
                      }
                    >
                      <Droppable droppableId={`chapters-${section.sectionId}`}>
                        {(droppableProvider) => (
                          <section
                            ref={droppableProvider.innerRef}
                            {...droppableProvider.droppableProps}
                          >
                            {section.chapters.map(
                              (chapter: Chapter, chapterIndex: number) => (
                                <Draggable
                                  key={chapter.chapterId}
                                  draggableId={chapter.chapterId}
                                  index={chapterIndex}
                                >
                                  {(draggableProvider) => (
                                    <ChapterItem
                                      chapter={chapter}
                                      chapterIndex={chapterIndex}
                                      sectionIndex={sectionIndex}
                                      draggableProvider={draggableProvider}
                                    />
                                  )}
                                </Draggable>
                              )
                            )}
                            {droppableProvider.placeholder}
                          </section>
                        )}
                      </Droppable>
                    </DragDropContext>

                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        dispatch(
                          openChapterModal({
                            sectionIndex,
                            chapterIndex: null,
                          })
                        )
                      }
                      className="add-chapter-button group"
                    >
                      <Plus className="add-chapter-button__icon" />
                      <span className="add-chapter-button__text">
                        Add Chapter
                      </span>
                    </Button>
                  </section>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </section>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const SectionHeader = ({
  section,
  sectionIndex,
  dragHandleProps,
}: {
  section: Section;
  sectionIndex: number;
  dragHandleProps: any;
}) => {
  const dispatch = useAppDispatch();

  return (
    <section className="droppable-section__header" {...dragHandleProps}>
      <section className="droppable-section__title-wrapper">
        <section className="droppable-section__title-container">
          <section className="droppable-section__title">
            <GripVertical className="h-6 w-6 mb-1" />
            <h3 className="text-lg font-medium">{section.sectionTitle}</h3>
          </section>
          <section className="droppable-chapter__actions">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              onClick={() => dispatch(openSectionModal({ sectionIndex }))}
            >
              <Edit className="h-5 w-5" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="p-0"
              onClick={() => dispatch(deleteSection(sectionIndex))}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </section>
        </section>
        {section.sectionDescription && (
          <p className="droppable-section__description">
            {section.sectionDescription}
          </p>
        )}
      </section>
    </section>
  );
};

const ChapterItem = ({
  chapter,
  chapterIndex,
  sectionIndex,
  draggableProvider,
}: {
  chapter: Chapter;
  chapterIndex: number;
  sectionIndex: number;
  draggableProvider: any;
}) => {
  const dispatch = useAppDispatch();

  return (
    <section
      ref={draggableProvider.innerRef}
      {...draggableProvider.draggableProps}
      {...draggableProvider.dragHandleProps}
      className={`droppable-chapter ${
        chapterIndex % 2 === 1
          ? "droppable-chapter--odd"
          : "droppable-chapter--even"
      }`}
    >
      <section className="droppable-chapter__title">
        <GripVertical className="h-4 w-4 mb-[2px]" />
        <p className="text-sm">{`${chapterIndex + 1}. ${chapter.title}`}</p>
      </section>
      <section className="droppable-chapter__actions">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="droppable-chapter__button"
          onClick={() =>
            dispatch(
              openChapterModal({
                sectionIndex,
                chapterIndex,
              })
            )
          }
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="droppable-chapter__button"
          onClick={() =>
            dispatch(
              deleteChapter({
                sectionIndex,
                chapterIndex,
              })
            )
          }
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </section>
    </section>
  );
};
